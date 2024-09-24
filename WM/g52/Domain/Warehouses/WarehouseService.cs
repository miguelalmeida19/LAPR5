using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using EletricGo.WM.Domain.Shared;
using Newtonsoft.Json;

namespace EletricGo.WM.Domain.Warehouses
{

    public class WarehouseService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWarehouseRepository _repo;

        public WarehouseService(IUnitOfWork unitOfWork, IWarehouseRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<WarehouseDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            var listDto = list.ConvertAll(warehouse =>
                new WarehouseDto(warehouse.Id.Value,  warehouse.Designation.designation, warehouse.Address.street,
                    warehouse.Address.postalCode,  warehouse.Address.location, warehouse.Latitude.latitude, warehouse.Longitude.longitude, warehouse.Active
                ));

            return listDto;
        }
        
        
        public async Task<List<WarehouseDto>> GetByWarehouseIdAsync(string id)
        {
            var list = await this._repo.GetAllAsync();

            var listDto = list?.ConvertAll(warehouse =>
                new WarehouseDto(warehouse.Id.Value,  warehouse.Designation.designation, warehouse.Address.street,
                    warehouse.Address.postalCode,  warehouse.Address.location, warehouse.Latitude.latitude, warehouse.Longitude.longitude, warehouse.Active
                ));
            
            return listDto?.Where(warehouse=>warehouse.Id.Contains(id)).ToList();
        }
        
        public async Task<WarehouseDto> GetByIdAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);

            if (warehouse == null) return null;

            if (!warehouse.Active)
            {
                throw new BusinessRuleValidationException("This warehouse is inactive!");
            }

            return new WarehouseDto ( warehouse.Id.Value,  warehouse.Designation.designation, warehouse.Address.street,
                warehouse.Address.postalCode, warehouse.Address.location, warehouse.Latitude.latitude, warehouse.Longitude.longitude, warehouse.Active);
        }

        public async Task<WarehouseDto> AddAsync(CreatingWarehouseDto dto)
        {
            var warehouse = new Warehouse(dto.Id,dto.Designation, dto.street, dto.postalCode, dto.location,
                dto.Latitude, dto.Longitude);

            await this._repo.AddAsync(warehouse);

            await this._unitOfWork.CommitAsync();

            using (var httpClient = new HttpClient())
            {
                var location = new
                {
                    locationId = dto.Id,
                    name = dto.location,
                    latitude = dto.Longitude,
                    longitude = dto.Latitude,
                    altitude = 150,
                    warehouseOrientation = 1,
                    warehouseModelUrl = "../../../assets/models/warehouses/warehouse_2.glb",
                    nodeRadius = 3
                };

                var json = JsonConvert.SerializeObject(location);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await httpClient.PostAsync("http://127.0.0.1:3000/api/locations", content);

                // you could check the response to verify it is succesful
                if (response.IsSuccessStatusCode)
                {
                    // handle success
                }
            }

            return new WarehouseDto ( warehouse.Id.Value,  warehouse.Designation.designation, warehouse.Address.street,
                warehouse.Address.postalCode, warehouse.Address.location, warehouse.Latitude.latitude, warehouse.Longitude.longitude, warehouse.Active);
        }

        public async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var warehouse = await this._repo.GetByIdAsync(new WarehouseId(dto.Id));

            if (warehouse == null) return null;

            // change all fields
            warehouse.ChangeDesignation(dto.designation);
            warehouse.ChangeAddress(dto.street, dto.postalCode, dto.location);
            warehouse.ChangeLatitude(dto.latitude);
            warehouse.ChangeLongitude(dto.longitude);

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto ( warehouse.Id.Value,  warehouse.Designation.designation, warehouse.Address.street,
                warehouse.Address.postalCode, warehouse.Address.location, warehouse.Latitude.latitude, warehouse.Longitude.longitude, warehouse.Active);
        }

        public async Task<WarehouseDto> InactivateAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);

            if (warehouse == null) return null;

            warehouse.MarkAsInactive();

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto ( warehouse.Id.Value,  warehouse.Designation.designation, warehouse.Address.street,
                warehouse.Address.postalCode, warehouse.Address.location, warehouse.Latitude.latitude, warehouse.Longitude.longitude, warehouse.Active);
        }
        
        public async Task<WarehouseDto> ActivateAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);

            if (warehouse == null) return null;

            warehouse.MarkAsActive();

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto ( warehouse.Id.Value,  warehouse.Designation.designation, warehouse.Address.street,
                warehouse.Address.postalCode, warehouse.Address.location, warehouse.Latitude.latitude, warehouse.Longitude.longitude, warehouse.Active);
        }


        public async Task<WarehouseDto> DeleteAsync(WarehouseId id)
        {
            var warehouse = await this._repo.GetByIdAsync(id);

            if (warehouse == null) return null;

            if (warehouse.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active warehouse.");

            this._repo.Remove(warehouse);
            await this._unitOfWork.CommitAsync();

            return new WarehouseDto ( warehouse.Id.Value,  warehouse.Designation.designation, warehouse.Address.street,
                warehouse.Address.postalCode, warehouse.Address.location, warehouse.Latitude.latitude,  warehouse.Longitude.longitude, warehouse.Active);
        }
        
    }
}
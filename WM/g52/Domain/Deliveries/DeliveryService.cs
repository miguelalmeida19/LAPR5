using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using EletricGo.WM.Domain.Shared;
using EletricGo.WM.Domain.Warehouses;

namespace EletricGo.WM.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        
        private readonly IDeliveryRepository _repo;
        private readonly IWarehouseRepository _repoWarehouses;

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo, IWarehouseRepository repoWarehouses)
        {
            _unitOfWork = unitOfWork;
            _repo = repo; 
            _repoWarehouses = repoWarehouses;
        }

        public async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();

            var listDto = list.ConvertAll(delivery =>
                new DeliveryDto(delivery.Id.Value, delivery.Weight.weight,
                    delivery.DueDate.day, delivery.DueDate.month, delivery.DueDate.year, delivery.PlacingTime.placingTime,
                    delivery.RemovingTime.removingTime, delivery.PackageDimension.xSize, delivery.PackageDimension.ySize,
                    delivery.PackageDimension.zSize, delivery.WarehouseId.Value));
            
            return listDto;
        }

        public async Task<List<DeliveryDto>> GetByDeliveryIdAsync(string id)
        {
            var list = await this._repo.GetAllAsync();

            var listDto = list?.ConvertAll(delivery =>
                new DeliveryDto(delivery.Id.Value, delivery.Weight.weight, delivery.DueDate.day, delivery.DueDate.month,
                    delivery.DueDate.year, delivery.PlacingTime.placingTime, delivery.RemovingTime.removingTime,
                    delivery.PackageDimension.xSize, delivery.PackageDimension.ySize, delivery.PackageDimension.zSize,
                    delivery.WarehouseId.Value));

            return listDto?.Where(delivery => delivery.Id.Contains(id)).ToList();
        }

        public async Task<DeliveryDto> GetByIdAsync(string id)
        {
            var delivery = await _repo.GetByIdAsync(new DeliveryId(id));

            return delivery == null ? null : new DeliveryDto(delivery.Id.Value, delivery.Weight.weight,
                delivery.DueDate.day, delivery.DueDate.month, delivery.DueDate.year, delivery.PlacingTime.placingTime,
                delivery.RemovingTime.removingTime, delivery.PackageDimension.xSize, delivery.PackageDimension.ySize,
                delivery.PackageDimension.zSize, delivery.WarehouseId.Value);
        }

        public async Task<List<DeliveryDto>> GetByWeightAsync(double _weight)
        {
            var list = await this._repo.GetAllAsync();
            
            var listDto = list?.ConvertAll(delivery =>
                new DeliveryDto(delivery.Id.Value, delivery.Weight.weight, delivery.DueDate.day, delivery.DueDate.month,
                    delivery.DueDate.year, delivery.PlacingTime.placingTime, delivery.RemovingTime.removingTime,
                    delivery.PackageDimension.xSize, delivery.PackageDimension.ySize, delivery.PackageDimension.zSize,
                    delivery.WarehouseId.Value));

            return listDto?.Where(delivery => delivery.weight.Equals(_weight)).ToList();
        }
        
        public async Task<List<DeliveryDto>> GetByWarehouseAsync(string _id)
        {
            var list = await this._repo.GetAllAsync();
            
            var listDto = list?.ConvertAll(delivery =>
                new DeliveryDto(delivery.Id.Value, delivery.Weight.weight, delivery.DueDate.day, delivery.DueDate.month,
                    delivery.DueDate.year, delivery.PlacingTime.placingTime, delivery.RemovingTime.removingTime,
                    delivery.PackageDimension.xSize, delivery.PackageDimension.ySize, delivery.PackageDimension.zSize,
                    delivery.WarehouseId.Value));

            return listDto?.Where(delivery => delivery.warehouseId.Contains(_id)).ToList();
        }

        public async Task<DeliveryDto> AddAsync(CreatingDeliveryDto dto)
        {
            await CheckWarehouseIdAsync(new WarehouseId(dto.warehouseId));
            var delivery = new Delivery(dto.Id, dto.weight, dto.day, dto.month, dto.year, dto.placingTime,
                dto.removingTime, dto.xSize, dto.ySize, dto.zSize, new WarehouseId(dto.warehouseId));

            await _repo.AddAsync(delivery);
            await _unitOfWork.CommitAsync();

            return new DeliveryDto(delivery.Id.Value, delivery.Weight.weight, delivery.DueDate.day, delivery.DueDate.month,
                delivery.DueDate.year, delivery.PlacingTime.placingTime, delivery.RemovingTime.removingTime, 
                delivery.PackageDimension.xSize, delivery.PackageDimension.ySize, delivery.PackageDimension.zSize,
                delivery.WarehouseId.Value);
        }

        public async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
        {
            await CheckWarehouseIdAsync(new WarehouseId(dto.warehouseId));
            var delivery = await _repo.GetByIdAsync(new DeliveryId(dto.Id));

            if (delivery == null) return null;
            
            delivery.ChangeWeight(dto.weight);
            delivery.ChangeDueDate(dto.day, dto.month, dto.year);
            delivery.ChangePlacingTime(dto.placingTime);
            delivery.ChangeRemovingTime(dto.removingTime);
            delivery.ChangePackageDimension(dto.xSize, dto.ySize, dto.zSize);
            delivery.ChangeWarehouseId(new WarehouseId(dto.warehouseId));

            await _unitOfWork.CommitAsync();
            
            return new DeliveryDto(delivery.Id.Value, delivery.Weight.weight, delivery.DueDate.day, delivery.DueDate.month,
                delivery.DueDate.year, delivery.PlacingTime.placingTime, delivery.RemovingTime.removingTime, 
                delivery.PackageDimension.xSize, delivery.PackageDimension.ySize, delivery.PackageDimension.zSize,
                delivery.WarehouseId.Value);
        }
        
        public async Task<DeliveryDto> InactivateAsync(string id)
        {
            var delivery = await _repo.GetByIdAsync(new DeliveryId(id));

            if (delivery == null) return null;
            await CheckWarehouseIdAsync(delivery.WarehouseId);
            
            delivery.MarkAsInactive();

            await _unitOfWork.CommitAsync();
            
            return new DeliveryDto(delivery.Id.Value, delivery.Weight.weight, delivery.DueDate.day, delivery.DueDate.month,
                delivery.DueDate.year, delivery.PlacingTime.placingTime, delivery.RemovingTime.removingTime, 
                delivery.PackageDimension.xSize, delivery.PackageDimension.ySize, delivery.PackageDimension.zSize,
                delivery.WarehouseId.Value);
        }

        public async Task<DeliveryDto> DeleteAsync(string id)
        {
            var delivery = await _repo.GetByIdAsync(new DeliveryId(id));

            if (delivery == null) return null;
            if (delivery.Active)
                throw new BusinessRuleValidationException("Business Error - Active Delivery can not be deleted.");
            
            _repo.Remove(delivery);
            await _unitOfWork.CommitAsync();
            
            return new DeliveryDto(delivery.Id.Value, delivery.Weight.weight, delivery.DueDate.day, delivery.DueDate.month,
                delivery.DueDate.year, delivery.PlacingTime.placingTime, delivery.RemovingTime.removingTime, 
                delivery.PackageDimension.xSize, delivery.PackageDimension.ySize, delivery.PackageDimension.zSize,
                delivery.WarehouseId.Value);
        }

        private async Task CheckWarehouseIdAsync(WarehouseId warehouseId)
        {
            var warehouse = await _repoWarehouses.GetByIdAsync(warehouseId);
            if (warehouse == null)
                throw new BusinessRuleValidationException("Business Error - Invalid Warehouse ID");
        }
    }
}
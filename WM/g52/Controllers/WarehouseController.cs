using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EletricGo.WM.Domain.Shared;
using EletricGo.WM.Domain.Warehouses;
using Microsoft.AspNetCore.Mvc;

namespace EletricGo.WM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController : ControllerBase
    {
        private readonly WarehouseService _service;

        public WarehouseController(WarehouseService service)
        {
            _service = service;
        }

        // GET: api/Warehouses
        [HttpGet]
        public async Task<List<WarehouseDto>> GetAll()
        {
            return await _service.GetAllAsync();
        }


        // GET: api/Warehouses/id/warehouseId
        [HttpGet("id/{id}")]
        public async Task<List<WarehouseDto>> GetWarehouseById(string id)
        {
            return await _service.GetByWarehouseIdAsync(id);
            ;
        }

        // GET: api/Warehouses/warehouseId
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDto>> GetGetById(string id)
        {

            var warehouse = await _service.GetByIdAsync(new WarehouseId(id));

            if (warehouse == null)
            {
                return NotFound();
            }

            return warehouse;
        }

        // POST: api/Warehouses
        [HttpPost]
        //public async Task<ActionResult<WarehouseDto>> Create(CreatingWarehouseDto dto)
        public async Task<IActionResult> Create(CreatingWarehouseDto dto)
        {
            try
            {
                var warehouse = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = warehouse.Id }, warehouse);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        // PUT: api/Warehouses/5
        [HttpPut("{id}")]
        public async Task<ActionResult<WarehouseDto>> Update(string id, WarehouseDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var warehouse = await _service.UpdateAsync(dto);

                if (warehouse == null)
                {
                    return NotFound();
                }

                return Ok(warehouse);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // Activate: api/Warehouses/activate
        [HttpPatch("activate")]
        public async Task<ActionResult<WarehouseDto>> Activate([FromBody] string warehouseIdDto)
        {
            var warehouseId = new WarehouseId(warehouseIdDto);
            var warehouse = await _service.ActivateAsync(warehouseId);

            if (warehouse == null)
            {
                return NotFound();
            }

            return Ok(warehouse);
        }

        // Inactivate: api/Warehouses/deactivate
        [HttpPatch("deactivate")]
        public async Task<ActionResult<WarehouseDto>> Deactivate([FromBody] string warehouseIdDto)
        {
            var warehouseId = new WarehouseId(warehouseIdDto);
    
            var warehouse = await _service.InactivateAsync(warehouseId);

            if (warehouse == null)
            {
                return NotFound();
            }

            return Ok(warehouse);
        }


        // DELETE: api/Warehouses/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<WarehouseDto>> HardDelete(string id)
        {
            try
            {
                var warehouse = await _service.DeleteAsync(new WarehouseId(id));

                if (warehouse == null)
                {
                    return NotFound();
                }

                return Ok(warehouse);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
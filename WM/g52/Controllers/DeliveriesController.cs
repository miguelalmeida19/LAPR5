using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using EletricGo.WM.Domain.Shared;
using EletricGo.WM.Domain.Deliveries;

namespace EletricGo.WM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly DeliveryService _service;

        public DeliveriesController(DeliveryService service)
        {
            _service = service;
        }
        
        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Deliveries/deliveryId
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDto>> GetGetById(string id)
        {
            var delivery = await _service.GetByIdAsync(id);
            
            return delivery == null ? NotFound() : delivery;
        }
        
        
        // GET: api/Deliveries/id/deliveryId
        [HttpGet("id/{id}")]
        public async Task<List<DeliveryDto>> GetDeliveryById(string id)
        {
            return await _service.GetByDeliveryIdAsync(id);
        }
        
        // GET: api/Deliveries/weight/value
        [HttpGet("weight/{weight:double}")]
        public async Task<List<DeliveryDto>> GetDeliveryByWeight(double weight)
        {
            return await _service.GetByWeightAsync(weight);
        }
        
        // GET: api/Deliveries/warehouseId/value
        [HttpGet("warehouseId/{id}")]
        public async Task<List<DeliveryDto>> GetDeliveryByWarehouse(string id)
        {
            return await _service.GetByWarehouseAsync(id);
        }

        
        // POST: api/Deliveries
        [HttpPost]
        public async Task<IActionResult> Create(CreatingDeliveryDto dto)
        {
            try
            {
                var delivery = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = delivery.Id }, delivery);
            }
            catch(Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }
        
        // PUT: api/Deliveries/5
        [HttpPut("{id}")]
        public async Task<ActionResult<DeliveryDto>> Update(string id, DeliveryDto dto)
        {
            if (id != dto.Id)  return BadRequest();
            
            try
            {
                var delivery = await _service.UpdateAsync(dto);

                return delivery == null ? NotFound() : Ok(delivery);
            }
            catch(Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }
        
        // Inactivate: api/Deliveries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryDto>> SoftDelete(string id)
        {
            var delivery = await _service.InactivateAsync(id);

            return delivery == null ? NotFound() : Ok(delivery);
        }
        
        // DELETE: api/Deliveries/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<DeliveryDto>> HardDelete(string id)
        {
            try
            {
                var delivery = await _service.DeleteAsync(id);

                return delivery == null ? NotFound() : Ok(delivery);
            }
            catch(Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }
        
    }
}
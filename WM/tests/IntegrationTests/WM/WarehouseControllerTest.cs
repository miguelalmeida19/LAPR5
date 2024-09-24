using System.Threading.Tasks;
using EletricGo.WM.Controllers;
using EletricGo.WM.Domain.Shared;
using EletricGo.WM.Domain.Warehouses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace tests.IntegrationTests.WM
{
    public class WarehouseControllerTest
    {
        private readonly Mock<IUnitOfWork> _unit;
        private readonly Mock<IWarehouseRepository> _repo;
        private readonly WarehouseService _service;
        private readonly WarehouseController _controller;
        private CreatingWarehouseDto cdto;
        private Warehouse _warehouse;
        private WarehouseDto wdto;

        public WarehouseControllerTest()
        {
            _unit = new Mock<IUnitOfWork>();
            _repo = new Mock<IWarehouseRepository>();
            _service = new WarehouseService(_unit.Object, _repo.Object);
            _controller = new WarehouseController(_service);
            _unit.Setup(x => x.CommitAsync()).Returns(Task.FromResult(1));

            cdto = new CreatingWarehouseDto("W01", "Warehouse 01, porto", "Rua do Sergio Conceicao", "4420-800",
                "Porto",
                50.0, 10.0);
            _warehouse = new Warehouse("W01", "Warehouse 01, porto", "Rua do Sergio Conceicao", "4420-800", "Porto",
                50.0, 10.0);
            wdto = new WarehouseDto("W01", "Warehouse 01, porto", "Rua do Sergio Conceicao", "4420-800", "Porto",
                50.0, 10.0, true);
        }

        [Fact]
        public async void ReturnBadRequestWhenDataIsInvalid()
        {
            CreatingWarehouseDto dto = new CreatingWarehouseDto("", "", "", "", "", 100.0, 200.0);
            var res = await _controller.Create(dto);
            Assert.IsType<BadRequestObjectResult>(res);
        }

        /*
         * [Fact]
        public async void ReturnCreatedActionWhenWarehouseIsRegisteredSuccessfully()
        {
            _repo.Setup(x => x.AddAsync(It.IsAny<Warehouse>())).Returns(Task.FromResult<Warehouse>(_warehouse));
            var res = await _controller.Create(cdto);
            Assert.IsType<CreatedAtActionResult>(res);
        }

        [Fact]
        public async void ThrowDbUpdateExceptionWhenWarehouseIsAlreadyRegistered()
        {
            _repo.Setup(x => x.AddAsync(It.IsAny<EletricGo.WM.Domain.Warehouses.Warehouse>()))
                .Returns(Task.FromResult<EletricGo.WM.Domain.Warehouses.Warehouse>(_warehouse));
            await _service.AddAsync(cdto);
            _repo.Setup(x => x.AddAsync(It.IsAny<EletricGo.WM.Domain.Warehouses.Warehouse>()))
                .Throws(new DbUpdateException());
            await Assert.ThrowsAsync<DbUpdateException>(() => _service.AddAsync(cdto));
        }
         */
    }
}
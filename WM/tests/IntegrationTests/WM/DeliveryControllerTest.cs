using System.Threading.Tasks;
using EletricGo.WM.Controllers;
using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Shared;
using EletricGo.WM.Domain.Warehouses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace tests.IntegrationTests.WM
{
    public class DeliveryControllerTest
    {
        private readonly Mock<IDeliveryRepository> _repo;
        private readonly Mock<IWarehouseRepository> _warRepo;
        private readonly DeliveriesController _controller;

        private readonly Warehouse _warehouse1;
        private readonly Warehouse _warehouse2;
        private readonly DeliveryId _deliveryId;
        private readonly Delivery _delivery;
        private readonly DeliveryDto _newDeliveryDto;
        private readonly CreatingDeliveryDto _cddto;

        public DeliveryControllerTest()
        {
            var unit = new Mock<IUnitOfWork>();
            _repo = new Mock<IDeliveryRepository>();
            _warRepo = new Mock<IWarehouseRepository>();
            var service = new DeliveryService(unit.Object, _repo.Object, _warRepo.Object);
            _controller = new DeliveriesController(service);
            unit.Setup(x => x.CommitAsync()).Returns(Task.FromResult(1));

            var warehouseId1 = new WarehouseId("W01");
            _warehouse1 = new Warehouse(warehouseId1.Value, "Warehouse 01, porto", "Rua do Sergio Conceicao",
                "4420-800", "Porto", 50.0, 10.0);
            var warehouseId2 = new WarehouseId("W02");
            _warehouse2 = new Warehouse(warehouseId2.Value, "Warehouse 02, porto", "Rua do Sergio Conceicao2",
                "4420-802", "Porto2", 50.2, 10.2);

            _deliveryId = new DeliveryId("D01");
            _delivery = new Delivery(_deliveryId.Value, 10.1, 1, 1, 2022, 10.2, 10.3,
                10.4, 10.5, 10.6, warehouseId1);
            _cddto = new CreatingDeliveryDto(_deliveryId.Value, 10.1, 1, 1, 2022, 10.2, 10.3,
                10.4, 10.5, 10.6, warehouseId1.Value);
            new DeliveryDto(_deliveryId.Value, 10.1, 1, 1, 2022, 10.2, 10.3,
                10.4, 10.5, 10.6, warehouseId1.Value);
            _newDeliveryDto = new DeliveryDto(_deliveryId.Value, 11.1, 2, 2, 2023, 11.2, 11.3,
                11.4, 11.5, 11.6, warehouseId2.Value);
        }

        [Fact]
        public async Task ReturnActionResultWhenDeliveryExists()
        {
            _repo.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                .Returns(Task.FromResult(_delivery));
            var res = await _controller.GetGetById(_deliveryId.Value);

            Assert.IsType<ActionResult<DeliveryDto>>(res);
        }

        [Fact]
        public async Task ReturnCreatedAtActionWhenDeliveryIsRegistered()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));

            _repo.Setup(x => x.AddAsync(It.IsAny<Delivery>()))
                .Returns(Task.FromResult(_delivery));
            var res = await _controller.Create(_cddto);

            Assert.IsType<CreatedAtActionResult>(res);
        }


        [Fact]
        public async void ThrowBadRequestWhenDeliveryAlreadyRegistered()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));
            _repo.Setup(x => x.AddAsync(It.IsAny<Delivery>()))
                .Returns(Task.FromResult(_delivery));

            await _controller.Create(_cddto);

            _repo.Setup(x => x.AddAsync(It.IsAny<Delivery>()))
                .Throws(new DbUpdateException());

            var res = await _controller.Create(_cddto);

            Assert.IsType<BadRequestObjectResult>(res);
        }

        [Fact]
        public async Task ThrowBadRequestWhenDataIsInvalid()
        {
            var cddto = new CreatingDeliveryDto("invalidTest", -1, -1, -1, -1, -1,
                -1, -1, -1, -1, "invalidTest");
            var res = await _controller.Create(cddto);

            Assert.IsType<BadRequestObjectResult>(res);
        }

        [Fact]
        public async Task ReturnActionResultWhenUpdatingDelivery()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse2));

            _repo.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                .Returns(Task.FromResult(_delivery));
            var res = await _controller.Update(_deliveryId.Value, _newDeliveryDto);

            Assert.IsType<ActionResult<DeliveryDto>>(res);
        }

        [Fact]
        public async Task ReturnActionResultWhenSoftDeletingDelivery()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));
            _repo.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                .Returns(Task.FromResult(_delivery));

            var res = await _controller.SoftDelete(_deliveryId.Value);

            Assert.IsType<ActionResult<DeliveryDto>>(res);
        }

        [Fact]
        public async Task ReturnActionResultWhenHardDeletingDelivery()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));
            _repo.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                .Returns(Task.FromResult(_delivery));

            var res = await _controller.HardDelete(_deliveryId.Value);

            Assert.IsType<ActionResult<DeliveryDto>>(res);
        }
    }
}
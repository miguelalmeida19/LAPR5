using System;
using System.Threading.Tasks;
using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Warehouses;
using EletricGo.WM.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace tests.UnitTests.WM.DeliveryTests
{
    public class DeliveryServiceTest
    {
        private readonly Mock<IDeliveryRepository> _repo;
        private readonly Mock<IWarehouseRepository> _warRepo;
        private readonly DeliveryService _service;

        private readonly Warehouse _warehouse1;
        private readonly Warehouse _warehouse2;
        private readonly DeliveryId _deliveryId;
        private readonly Delivery _delivery;
        private readonly DeliveryDto _deliveryDto;
        private readonly DeliveryDto _newDeliveryDto;
        private readonly CreatingDeliveryDto _cddto;

        public DeliveryServiceTest()
        {
            var unit = new Mock<IUnitOfWork>();
            _repo = new Mock<IDeliveryRepository>();
            _warRepo = new Mock<IWarehouseRepository>();
            _service = new DeliveryService(unit.Object, _repo.Object, _warRepo.Object);
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
            _deliveryDto = new DeliveryDto(_deliveryId.Value, 10.1, 1, 1, 2022, 10.2, 10.3,
                10.4, 10.5, 10.6, warehouseId1.Value);
            _newDeliveryDto = new DeliveryDto(_deliveryId.Value, 11.1, 2, 2, 2023, 11.2, 11.3,
                11.4, 11.5, 11.6, warehouseId2.Value);
        }

        [Fact]
        public async Task ReturnDtoWhenDeliveryExists()
        {
            _repo.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                .Returns(Task.FromResult(_delivery));
            var res = await _service.GetByIdAsync(_deliveryId.Value);

            Assert.Equal(_deliveryDto.Id, res.Id);
            Assert.Equal(_deliveryDto.weight, res.weight);
            Assert.Equal(_deliveryDto.day, res.day);
            Assert.Equal(_deliveryDto.month, res.month);
            Assert.Equal(_deliveryDto.year, res.year);
            Assert.Equal(_deliveryDto.placingTime, res.placingTime);
            Assert.Equal(_deliveryDto.removingTime, res.removingTime);
            Assert.Equal(_deliveryDto.xSize, res.xSize);
            Assert.Equal(_deliveryDto.ySize, res.ySize);
            Assert.Equal(_deliveryDto.zSize, res.zSize);
            Assert.Equal(_deliveryDto.warehouseId, res.warehouseId);
        }

        [Fact]
        public async Task ReturnDtoWhenDeliveryIsRegistered()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));

            _repo.Setup(x => x.AddAsync(It.IsAny<Delivery>()))
                .Returns(Task.FromResult(_delivery));
            var res = await _service.AddAsync(_cddto);

            Assert.Equal(_deliveryDto.Id, res.Id);
            Assert.Equal(_deliveryDto.weight, res.weight);
            Assert.Equal(_deliveryDto.day, res.day);
            Assert.Equal(_deliveryDto.month, res.month);
            Assert.Equal(_deliveryDto.year, res.year);
            Assert.Equal(_deliveryDto.placingTime, res.placingTime);
            Assert.Equal(_deliveryDto.removingTime, res.removingTime);
            Assert.Equal(_deliveryDto.xSize, res.xSize);
            Assert.Equal(_deliveryDto.ySize, res.ySize);
            Assert.Equal(_deliveryDto.zSize, res.zSize);
            Assert.Equal(_deliveryDto.warehouseId, res.warehouseId);
        }

        [Fact]
        public async void ThrowDbUpdateExceptionWhenDeliveryAlreadyRegistered()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));
            _repo.Setup(x => x.AddAsync(It.IsAny<Delivery>()))
                .Returns(Task.FromResult(_delivery));

            await _service.AddAsync(_cddto);

            _repo.Setup(x => x.AddAsync(It.IsAny<Delivery>()))
                .Throws(new DbUpdateException());

            await Assert.ThrowsAsync<DbUpdateException>(() => _service.AddAsync(_cddto));
        }

        [Fact]
        public async Task ThrowExceptionWhenDataIsInvalid()
        {
            var cddto = new CreatingDeliveryDto("invalidTest", -1, -1, -1, -1, -1,
                -1, -1, -1, -1, "invalidTest");
            await Assert.ThrowsAsync<Exception>(() => _service.AddAsync(cddto));
        }

        [Fact]
        public async Task ReturnExpectedDtoWhenUpdatingDelivery()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse2));

            _repo.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                .Returns(Task.FromResult(_delivery));
            var res = await _service.UpdateAsync(_newDeliveryDto);

            Assert.Equal(_newDeliveryDto.Id, res.Id);
            Assert.Equal(_newDeliveryDto.weight, res.weight);
            Assert.Equal(_newDeliveryDto.day, res.day);
            Assert.Equal(_newDeliveryDto.month, res.month);
            Assert.Equal(_newDeliveryDto.year, res.year);
            Assert.Equal(_newDeliveryDto.placingTime, res.placingTime);
            Assert.Equal(_newDeliveryDto.removingTime, res.removingTime);
            Assert.Equal(_newDeliveryDto.xSize, res.xSize);
            Assert.Equal(_newDeliveryDto.ySize, res.ySize);
            Assert.Equal(_newDeliveryDto.zSize, res.zSize);
            Assert.Equal(_newDeliveryDto.warehouseId, res.warehouseId);
        }

        [Fact]
        public async Task ReturnExpectedResultWhenDeactivatingDelivery()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));
            _repo.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                .Returns(Task.FromResult(_delivery));

            await _service.InactivateAsync(_deliveryId.Value);

            Assert.False(_delivery.Active);
        }

        [Fact]
        public async Task ReturnExpectedResultWhenDeletingDelivery()
        {
            _warRepo.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                .Returns(Task.FromResult(_warehouse1));
            _repo.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                .Returns(Task.FromResult(_delivery));

            var res = await _service.InactivateAsync(_deliveryId.Value);

            Assert.Equal(_deliveryDto.Id, res.Id);
            Assert.Equal(_deliveryDto.weight, res.weight);
            Assert.Equal(_deliveryDto.day, res.day);
            Assert.Equal(_deliveryDto.month, res.month);
            Assert.Equal(_deliveryDto.year, res.year);
            Assert.Equal(_deliveryDto.placingTime, res.placingTime);
            Assert.Equal(_deliveryDto.removingTime, res.removingTime);
            Assert.Equal(_deliveryDto.xSize, res.xSize);
            Assert.Equal(_deliveryDto.ySize, res.ySize);
            Assert.Equal(_deliveryDto.zSize, res.zSize);
            Assert.Equal(_deliveryDto.warehouseId, res.warehouseId);
        }
    }
}
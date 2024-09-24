using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Warehouses;

namespace tests.UnitTests.WM.DeliveryTests
{
    public class DeliveryTest
    {
        private const string _id = "D01";
        private const double _weight = 10.1;
        private const int _day = 1;
        private const int _month = 1;
        private const int _year = 2022;
        private const double _placingTime = 10.2;
        private const double _removingTime = 10.3;
        private const double _xSize = 10.4;
        private const double _ySize = 10.5;
        private const double _zSize = 10.6;
        private readonly WarehouseId _warehouseId = new("W01");

        private const double _new_weight = 11.1;
        private const int _new_day = 2;
        private const int _new_month = 2;
        private const int _new_year = 2023;
        private const double _new_placingTime = 11.2;
        private const double _new_removingTime = 11.3;
        private const double _new_xSize = 11.4;
        private const double _new_ySize = 11.5;
        private const double _new_zSize = 11.6;
        private readonly WarehouseId _new_warehouseId = new("W02");

        [Fact]
        public void SuccessfullyCreateDelivery()
        {
            var delivery = new Delivery(_id, _weight, _day, _month, _year, _placingTime, _removingTime,
                _xSize, _ySize, _zSize, _warehouseId);

            Assert.Equal(_id, delivery.Id.Value);
            Assert.Equal(_weight, delivery.Weight.weight);
            Assert.Equal(_day, delivery.DueDate.day);
            Assert.Equal(_month, delivery.DueDate.month);
            Assert.Equal(_year, delivery.DueDate.year);
            Assert.Equal(_placingTime, delivery.PlacingTime.placingTime);
            Assert.Equal(_removingTime, delivery.RemovingTime.removingTime);
            Assert.Equal(_xSize, delivery.PackageDimension.xSize);
            Assert.Equal(_ySize, delivery.PackageDimension.ySize);
            Assert.Equal(_zSize, delivery.PackageDimension.zSize);
            Assert.Equal(_warehouseId, delivery.WarehouseId);
        }

        [Fact]
        public void SuccessfullyUpdateDelivery()
        {
            var delivery = new Delivery(_id, _weight, _day, _month, _year, _placingTime, _removingTime,
                _xSize, _ySize, _zSize, _warehouseId);

            delivery.ChangeWeight(_new_weight);
            delivery.ChangeDueDate(_new_day, _new_month, _new_year);
            delivery.ChangePlacingTime(_new_placingTime);
            delivery.ChangeRemovingTime(_new_removingTime);
            delivery.ChangePackageDimension(_new_xSize, _new_ySize, _new_zSize);
            delivery.ChangeWarehouseId(_new_warehouseId);

            Assert.Equal(_new_weight, delivery.Weight.weight);
            Assert.Equal(_new_day, delivery.DueDate.day);
            Assert.Equal(_new_month, delivery.DueDate.month);
            Assert.Equal(_new_year, delivery.DueDate.year);
            Assert.Equal(_new_placingTime, delivery.PlacingTime.placingTime);
            Assert.Equal(_new_removingTime, delivery.RemovingTime.removingTime);
            Assert.Equal(_new_xSize, delivery.PackageDimension.xSize);
            Assert.Equal(_new_ySize, delivery.PackageDimension.ySize);
            Assert.Equal(_new_zSize, delivery.PackageDimension.zSize);
            Assert.Equal(_new_warehouseId, delivery.WarehouseId);
        }

        [Fact]
        public void SuccessfullyInactivateDelivery()
        {
            var delivery = new Delivery(_id, _weight, _day, _month, _year, _placingTime, _removingTime,
                _xSize, _ySize, _zSize, _warehouseId);

            delivery.MarkAsInactive();

            Assert.False(delivery.Active);
        }
    }
}
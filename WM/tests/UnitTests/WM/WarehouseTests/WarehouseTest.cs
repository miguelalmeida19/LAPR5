using System;
using Xunit.Abstractions;

namespace tests.UnitTests.WM.WarehouseTests
{
    public class WarehouseTest
    {
        private readonly ITestOutputHelper _testOutputHelper;
    
        private string _id;
        private string _designation;
        private string _street;
        private string _postalCode;
        private string _location;
        private double _latitude;
        private double _longitude;
    
        public WarehouseTest(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
            _id = "123";
            _designation = "WM02";
            _street = "Rua";
            _postalCode = "4420-700";
            _location = "Gondomar";
            _latitude = 10.0;
            _longitude = -10.0;
        }
    
        [Fact]
        public void SuccessfullyCreateWarehouse()
        {
            var warehouse = CreateWarehouse();
            Assert.True(warehouse != null);
        }
    
        [Fact]
        public void FailToCreateWarehouseWithInvalidID()
        {
            _id = "1234";
            Assert.Throws<Exception>(CreateWarehouse);
        }
        
        [Fact]
        public void FailToCreateWarehouseWithInvalidDesignation()
        {
            _designation = "esta designaçao é demasidado grande mesmo nunca mais acaba acho que tem mais que cinquenta carateres ";
            Assert.Throws<Exception>(CreateWarehouse);
        }
        
        [Fact]
        public void FailToCreateWarehouseWithInvalidLatitude()
        {
            _latitude = 100.0;
            Assert.Throws<Exception>(CreateWarehouse);
        }
    
        [Fact]
        public void FailToCreateWarehouseWithInvalidLongitude()
        {
            _longitude = 200.0;
            Assert.Throws<Exception>(CreateWarehouse);
        }
        private EletricGo.WM.Domain.Warehouses.Warehouse CreateWarehouse()
        {
            return new EletricGo.WM.Domain.Warehouses.Warehouse(_id,_designation, _street, _postalCode, _location,
                _latitude, _longitude);
        }
    }
}
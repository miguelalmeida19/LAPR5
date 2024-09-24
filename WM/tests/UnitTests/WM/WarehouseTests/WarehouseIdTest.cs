using System;
using EletricGo.WM.Domain.Warehouses;

namespace tests.UnitTests.WM.WarehouseTests
{
    public class WarehouseIdTest
    {
        [Fact]
        public void SuccessfullyCreateWarehouseId()
        {
            const string id = "1a3";
            var c = new WarehouseId(id);
            Assert.Equal(id, c.Value);
        }

        [Fact]
        public void FailToCreateEmptyWarehouseId()
        {
            Assert.Throws<Exception>(() => new WarehouseId(""));
        }

        [Fact]
        public void FailToCreateNullWarehouseId()
        {
            Assert.Throws<NullReferenceException>(() => new WarehouseId(null));
        }

        [Fact]
        public void FailToCreateBigId()
        {
            Assert.Throws<Exception>(() => new WarehouseId("123a"));
        }
    
        [Fact]
        public void FailToCreateInvalidId()
        {
            Assert.Throws<Exception>(() => new WarehouseId("W-1"));
        }
    }
}
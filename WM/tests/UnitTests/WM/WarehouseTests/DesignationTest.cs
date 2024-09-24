using System;
using EletricGo.WM.Domain.Warehouses;

namespace tests.UnitTests.WM.WarehouseTests
{
    public class DesignationTest
    {
        [Fact]
        public void SuccessfullyCreateDesignation()
        {
            const string designation = "Warehouse01";
            var c = new Designation(designation);
            Assert.Equal(designation, c.designation);
        }

        [Fact]
        public void FailToCreateEmptyDesignation()
        {
            Assert.Throws<Exception>(() => new Designation(""));
        }

        [Fact]
        public void FailToCreateNullDesignation()
        {
            Assert.Throws<Exception>(() => new Designation(null));
        }

        [Fact]
        public void FailToCreateBigDesignation()
        {
            Assert.Throws<Exception>(() =>
                new Designation(
                    "esta designaçao é demasidado grande mesmo nunca mais acaba acho que tem mais que cinquenta carateres "));
        }
    }
}
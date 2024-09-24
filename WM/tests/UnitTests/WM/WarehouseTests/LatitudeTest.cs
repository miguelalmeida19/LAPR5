using System;
using EletricGo.WM.Domain.Warehouses;

namespace tests.UnitTests.WM.WarehouseTests
{
    public class LatitudeTest
    {
        [Fact]
        public void SuccessfullyCreateLatitude()
        {
            const double latitude = 20.0;
            var c = new Latitude(latitude);

            Assert.Equal(latitude, c.latitude);
        }

        [Fact]
        public void FailToCreateLatitudeWithBigValue()
        {
            Assert.Throws<Exception>(() => new Latitude(99.0));
        }

        [Fact]
        public void FailToCreateLatitudeWithSmallValue()
        {
            Assert.Throws<Exception>(() => new Latitude(-99.0));
        }
    }
}
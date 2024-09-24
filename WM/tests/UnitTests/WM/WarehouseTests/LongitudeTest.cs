using System;
using EletricGo.WM.Domain.Warehouses;

namespace tests.UnitTests.WM.WarehouseTests
{
    public class LongitudeTest
    {
        [Fact]
        public void SuccessfullyCreateLongitude()
        {
            const double longitude = 20.0;
            var c = new Longitude(longitude);

            Assert.Equal(longitude, c.longitude);
        }

        [Fact]
        public void FailToCreateLongitudeWithBigValue()
        {
            Assert.Throws<Exception>(() => new Longitude(199.0));
        }

        [Fact]
        public void FailToCreateLongitudeWithSmallValue()
        {
            Assert.Throws<Exception>(() => new Longitude(-199.0));
        }
    }
}
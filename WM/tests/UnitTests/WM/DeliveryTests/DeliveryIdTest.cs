using System;
using EletricGo.WM.Domain.Deliveries;

namespace tests.UnitTests.WM.DeliveryTests
{
    public class DeliveryIdTest
    {
        [Fact]
        public void SuccessfullyCreateDeliveryId()
        {
            const string id = "1a3";
            var c = new DeliveryId(id);
            Assert.Equal(id, c.Value);
        }

        [Fact]
        public void FailToCreateEmptyDeliveryId()
        {
            Assert.Throws<Exception>(() => new DeliveryId(""));
        }

        [Fact]
        public void FailToCreateNullDeliveryId()
        {
            Assert.Throws<NullReferenceException>(() => new DeliveryId(null));
        }

        [Fact]
        public void FailToCreateBigId()
        {
            Assert.Throws<Exception>(() => new DeliveryId("123a"));
        }

        [Fact]
        public void FailToCreateInvalidId()
        {
            Assert.Throws<Exception>(() => new DeliveryId("D-1"));
        }
    }
}
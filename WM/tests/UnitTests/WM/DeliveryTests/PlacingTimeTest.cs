using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Shared;

namespace tests.UnitTests.WM.DeliveryTests
{
    public class PlacingTimeTest
    {
        [Fact]
        public void SuccessfullyCreatePlacingTime()
        {
            const double placingTime = 20.0;
            var c = new PlacingTime(placingTime);

            Assert.Equal(placingTime, c.placingTime);
        }

        [Fact]
        public void FailToCreatePlacingTimeWithBigValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new PlacingTime(100));
        }

        [Fact]
        public void FailToCreatePlacingTimeWithSmallValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new PlacingTime(-1.0));
        }
    }
}
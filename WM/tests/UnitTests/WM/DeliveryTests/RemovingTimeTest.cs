using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Shared;

namespace tests.UnitTests.WM.DeliveryTests
{
    public class RemovingTimeTest
    {
        [Fact]
        public void SuccessfullyCreateRemovingTime()
        {
            const double removingTime = 20.0;
            var c = new RemovingTime(removingTime);

            Assert.Equal(removingTime, c.removingTime);
        }

        [Fact]
        public void FailToCreateRemovingTimeWithBigValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new RemovingTime(100));
        }

        [Fact]
        public void FailToCreateRemovingTimeWithSmallValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new RemovingTime(-1.0));
        }
    }
}
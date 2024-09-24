using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Shared;

namespace tests.UnitTests.WM.DeliveryTests
{
    public class WeightTest
    {
        [Fact]
        public void SuccessfullyCreateWeight()
        {
            const double weight = 20.0;
            var c = new Weight(weight);

            Assert.Equal(weight, c.weight);
        }

        [Fact]
        public void FailToCreateWeightWithSmallValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Weight(-1.0));
        }
    }
}
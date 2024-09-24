using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Shared;

namespace tests.UnitTests.WM.DeliveryTests
{
    public class PackageDimensionTest
    {
        [Fact]
        public void SuccessfullyCreatePackageDimension()
        {
            const double xSize = 20.0;
            const double ySize = 10.1;
            const double zSize = 35.6;

            var c = new PackageDimension(xSize, ySize, zSize);

            Assert.Equal(xSize, c.xSize);
            Assert.Equal(ySize, c.ySize);
            Assert.Equal(zSize, c.zSize);
        }

        /**
     * [Fact]
    public void FailToCreateXWithBigValue()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new PackageDimension(101.0, 1.0, 1.0));
    }
     */
        [Fact]
        public void FailToCreateXWithSmallValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new PackageDimension(-1.0, 1.0, 1.0));
        }

        /*
         *
         *     [Fact]
        public void FailToCreateYWithBigValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new PackageDimension(1.0, 101.0, 1.0));
        }
         */

        [Fact]
        public void FailToCreateYWithSmallValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new PackageDimension(1.0, -1.0, 1.0));
        }

        /*
         *     [Fact]
        public void FailToCreateZWithBigValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new PackageDimension(1.0, 1.0, 101.0));
        }
         */

        [Fact]
        public void FailToCreateZWithSmallValue()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new PackageDimension(1.0, 1.0, -1.0));
        }
    }
}
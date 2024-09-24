using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Deliveries
{

    public class PackageDimension : IValueObject
    {
        // size in centimeters
        
        public double xSize { get; set; }
        
        public double ySize { get; set; }
        
        public double zSize { get; set; }
        
        public PackageDimension() {}

        public PackageDimension(double xSize, double ySize, double zSize)
        {
            if (!IsValid(xSize) || !IsValid(ySize) || !IsValid(zSize)) 
                throw new BusinessRuleValidationException("Business Error - Package Dimensions are invalid. ");

            this.xSize = xSize;
            this.ySize = ySize;
            this.zSize = zSize;
        }

        // maximum length for a package is 10 meters per side
        private static bool IsValid(double size)
        {
            return size is > 0 and <= 1000;
        }

    }

}
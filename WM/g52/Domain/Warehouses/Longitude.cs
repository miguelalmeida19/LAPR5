using System;
using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Warehouses
{

    public class Longitude : IValueObject
    {
        public double longitude { get; set; }

        public Longitude()
        {
        }

        public Longitude(double longitude)
        {
            if (!isValid(longitude))
            {
                throw new Exception("Longitude should be between -180 and 180. Please enter a new valid longitude.");
            }
            this.longitude = longitude;
        }
        
        public bool isValid(double longitude)
        {
            if (longitude > -180.0 & longitude < 180.0)
                return true;

            return false;
        }

    }
}
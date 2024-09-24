using System;
using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Warehouses
{

    public class Latitude : IValueObject
    {
        public double latitude { get; set; }

        public Latitude()
        {
        }

        public Latitude(double latitude)
        {
            if (!isValid(latitude))
            {
                throw new Exception("Latitude should be between -90 and 90. Please enter a new valid latitude.");
            }
            this.latitude = latitude;
        }
        
        public bool isValid(double latitude)
        {
            if (latitude > -90.0 & latitude < 90.0)
                return true;

            return false;
        }


    }
}
using System;
using System.Text.RegularExpressions;
using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Warehouses
{
    public class Address : IValueObject
    {
        private const string motif = @"^[1-9]\d{3}(-\d{3})?$";

        public string street { get; set; }
        public string postalCode { get; set; }
        public string location { get; set; }

        public Address() {}

        public Address(string street, string postalCode, string location)
        {
            if (String.IsNullOrWhiteSpace(street))
                throw new Exception("Need to introduce street.");
            if (!ValidPostalCode(postalCode) | String.IsNullOrEmpty(postalCode))
                throw new Exception("Please introduce valid postal code!");
            if (String.IsNullOrWhiteSpace(location))
                throw new Exception("Need to introduce location!");
            
            this.street = street;
            this.postalCode = postalCode;
            this.location = location;
        }
        
        public bool ValidPostalCode(string postalCode)
        {
            return Regex.IsMatch(postalCode, motif);
        }


        public override string ToString() 
        {
            return $"{street}, {postalCode}, {location} ";
        }
    }
}
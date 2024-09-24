using System;
using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Warehouses
{

    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {
        public bool Active { get; private set; }

        public Designation Designation { get; private set; }

        public Address Address { get; private set; }
        
        //[Required]
        //[Range(-180, 180, ErrorMessage = "Latitude deve estar entre -180 e 180")]
        public Latitude Latitude { get; private set; }

        public Longitude Longitude { get; private set; }

        private Warehouse()
        {
            this.Active = true;
        }

        public Warehouse(string id,Designation designation, Address address, Latitude latitude, Longitude longitude)
        {
            this.Id = new WarehouseId(id);
            
            if (!designation.isValid(designation.ToString()))
                throw new Exception("Designation must be 50 chars long and not empty.");
            if (!address.ValidPostalCode(address.postalCode))
                throw new Exception("Please enter valid postal code.");
            if (!latitude.isValid(latitude.latitude))
                throw new Exception("Latitude must be between -90 and 90.");
            if (!longitude.isValid(longitude.longitude))
                throw new Exception("Longitude must be between -180 and 180.");
            
            this.Designation = designation;
            this.Address = address;
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Active = true;
        }

        public Warehouse(string id,string designation, string street, string postalCode, string location,
            double latitude, double longitude) {

            this.Id = new WarehouseId(id);
            
            this.Designation = new Designation(designation);
            this.Address = new Address(street, postalCode, location);
            this.Latitude = new Latitude(latitude);
            this.Longitude = new Longitude(longitude);
            this.Active = true;
            
            if (!this.Designation.isValid(designation)) 
                throw new Exception("Designation must be 50 chars long and not empty.");
            if (!this.Address.ValidPostalCode(postalCode))  
                throw new Exception("Please enter valid postal code.");
            if (!this.Latitude.isValid(latitude)) 
                throw new Exception("Latitude must be between -90 and 90.");
            if (!this.Longitude.isValid(longitude))  
                throw new Exception("Longitude must be between -180 and 180.");
        }


        public void ChangeDesignation(string designation)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the description to an inactive warehouse.");
            if (!this.Designation.isValid(designation))
                throw new Exception("Designation must be 50 chars long and not empty.");
            
            this.Designation = new Designation(designation);
        }

        public void ChangeAddress(string street, string postalCode, string location)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the address to an inactive warehouse.");
            if (String.IsNullOrWhiteSpace(street))
                throw new Exception("Please enter a street.It can't be empty or null.");
            if (!Address.ValidPostalCode(postalCode))
                throw new Exception("Please enter a valid postal code .");
            if (String.IsNullOrWhiteSpace(location))
                throw new Exception("Please enter a location.It can't be empty or null.");
            
            this.Address = new Address(street, postalCode, location);
        }

        public void ChangeLatitude(double latitude)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the latitude to an inactive warehouse.");
            if (!this.Latitude.isValid(latitude))
                throw new Exception("Latitude should be between -90 and 90. Please enter a new valid latitude.");
            
            this.Latitude = new Latitude(latitude);
        }

        public void ChangeLongitude(double longitude)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the longitude to an inactive warehouse.");
            if (!this.Longitude.isValid(longitude))
                throw new Exception("Longitude should be between -180 and 180. Please enter a new valid longitude.");
            
            this.Longitude = new Longitude(longitude);
        }

        public void MarkAsInactive()
        {
            this.Active = false;
        }
        
        public void MarkAsActive()
        {
            this.Active = true;
        }
    }
}
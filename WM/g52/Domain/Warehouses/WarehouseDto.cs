using System;

namespace EletricGo.WM.Domain.Warehouses
{

    public class WarehouseDto
    {
        public string Id { get; set; }

        public string designation { get; set; }

        public string street { get; set; }
        
        public string postalCode { get; set; }

        public string location { get; set; }

        public double latitude { get; set; }

        public double longitude { get; set; }
        
        public bool active { get; set; }
        
        /*
        public WarehouseDto(string id, string designation, string street, string postalCode, string location,
            double latitude, double longitude)
        {
            this.Id = id;
            this.designation = designation;
            this.street = street;
            this.postalCode = postalCode;
            this.location = location;
            this.latitude = latitude;
            this.longitude = longitude;
            this.active = true;
        }
        */
        
        public WarehouseDto(string id, string designation, string street, string postalCode, string location,
            double latitude, double longitude, bool active)
        {
            this.Id = id;
            this.designation = designation;
            this.street = street;
            this.postalCode = postalCode;
            this.location = location;
            this.latitude = latitude;
            this.longitude = longitude;
            this.active = active;
        }
    }
}
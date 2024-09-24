using EletricGo.WM.Domain.Warehouses;

namespace EletricGo.WM.Domain.Warehouses
{

    public class CreatingWarehouseDto
    {
        public string Id
        {
            get;
            set;
        }
        public string Designation { get; set; }

        public string street { get; set; }
        
        public string postalCode { get; set; }
        
        public string location { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public CreatingWarehouseDto(string id,string designation, string street, string postalCode, string location, double latitude, double longitude)
        {
            this.Id = id;
            this.Designation = designation;
            this.street = street;
            this.postalCode = postalCode;
            this.location = location;
            this.Latitude = latitude;
            this.Longitude = longitude;
        }
    }
}
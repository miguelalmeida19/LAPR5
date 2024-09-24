using EletricGo.WM.Domain.Warehouses;

namespace EletricGo.WM.Domain.Deliveries
{
    public class CreatingDeliveryDto {
        
        public string Id { get; set; }
        
        public double weight { get; set; }
        
        public int day { get; set; }
        
        public int month { get; set; }
        
        public int year { get; set; }
        
        public double placingTime { get; set; }
        
        public double removingTime { get; set; }
        
        public double xSize { get; set; }
        
        public double ySize { get; set; }
        
        public double zSize { get; set; }
        
        public string warehouseId { get; set; }

        public CreatingDeliveryDto(string id, double weight, int day, int month, int year, double placingTime,
            double removingTime, double xSize, double ySize, double zSize, string warehouseId) {
            this.Id = id;
            this.weight = weight;
            this.day = day;
            this.month = month;
            this.year = year;
            this.placingTime = placingTime;
            this.removingTime = removingTime;
            this.xSize = xSize;
            this.ySize = ySize;
            this.zSize = zSize;
            this.warehouseId = warehouseId;
        }
    }
}
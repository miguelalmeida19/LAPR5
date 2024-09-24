using System.ComponentModel.DataAnnotations.Schema;
using EletricGo.WM.Domain.Shared;
using EletricGo.WM.Domain.Warehouses;

namespace EletricGo.WM.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {
        public bool Active { get;  private set; }
        public Weight Weight { get; private set; }
        public DueDate DueDate { get; private set; }
        public PlacingTime PlacingTime { get; private set; }
        public RemovingTime RemovingTime { get; private set; }
        public PackageDimension PackageDimension { get; private set; } 
        [ForeignKey("FK_Deliveries_Warehouse")] public WarehouseId WarehouseId { get;  private set; }

        private Delivery() {
            this.Active = true;
        }

        public Delivery(string id, double weight, int day, int month, int year, double placingTimeMinutes, double removingTimeMinutes,
            double x, double y, double z, WarehouseId warehouseId) {
            if (warehouseId == null) 
                throw new BusinessRuleValidationException("Business Error - Every Delivery requires a target Warehouse.");
            
            this.Id = new DeliveryId(id);
            
            this.Weight = new Weight(weight);
            this.DueDate = new DueDate(day, month, year);
            this.PlacingTime = new PlacingTime(placingTimeMinutes);
            this.RemovingTime = new RemovingTime(removingTimeMinutes);
            this.PackageDimension = new PackageDimension(x, y, z);
            
            this.WarehouseId = warehouseId;
            this.Active = true;
        }

        public Delivery(string id, Weight weight, DueDate dueDate, PlacingTime placingTime, RemovingTime removingTime,
            PackageDimension packageDimension, WarehouseId warehouseId) {
            if (warehouseId == null) 
                throw new BusinessRuleValidationException("Business Error - Every Delivery requires a target Warehouse.");
            
            this.Id = new DeliveryId(id);
            this.Weight = weight;
            this.DueDate = dueDate;
            this.PlacingTime = placingTime;
            this.RemovingTime = removingTime;
            this.PackageDimension = packageDimension;
            
            this.WarehouseId = warehouseId;
            this.Active = true;
        }
        
        public void ChangeWarehouseId(WarehouseId warehouseId) {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "It is not possible to change the target Warehouse of an inactive Delivery.");
            if (warehouseId == null)
                throw new BusinessRuleValidationException(
                    "Every Delivery requires a target Warehouse.");
            this.WarehouseId = warehouseId;
        }
        
        public void ChangeWeight(double weight)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "Business Error - Impossible to change the Weight of an Inactive Delivery.");
            this.Weight = new Weight(weight);
        }
        
        public void ChangeDueDate(int day, int month, int year)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "Business Error - Impossible to change the Due Date of an Inactive Delivery.");
            this.DueDate = new DueDate(day, month, year);
        }
        
        public void ChangePlacingTime(double placingTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "Business Error - Impossible to change the Placing Time of an Inactive Delivery.");
            this.PlacingTime = new PlacingTime(placingTime);
        }
        
        public void ChangeRemovingTime(double removingTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "Business Error - Impossible to change the Due Date of an Inactive Delivery.");
            this.RemovingTime = new RemovingTime(removingTime);
        }

        public void ChangePackageDimension(double x, double y, double z)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException(
                    "Business Error - Impossible to change the Package Dimensions of an Inactive Delivery.");
            this.PackageDimension = new PackageDimension(x, y, z);
        }

        public void MarkAsInactive() {
            this.Active = false;
        }

    }
}
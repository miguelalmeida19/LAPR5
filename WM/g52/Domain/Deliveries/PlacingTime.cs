using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Deliveries
{
    public class PlacingTime : IValueObject
    {
        public double placingTime { get; set; } // in minutes
        
        public PlacingTime() {}

        public PlacingTime(double time)
        {
            if (!IsValid(time)) 
                throw new BusinessRuleValidationException("Business Error - Placing Time is invalid. ");
            
            this.placingTime = time;
        }
        
        // Maximum placing time is 1 hour, minimum is 1 minute
        public bool IsValid(double time) {
            return time > 0 & time <= 60; 
        }
    }
}
using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Deliveries
{
    public class RemovingTime : IValueObject
    {
        public double removingTime { get; set; } // in minutes
        
        public RemovingTime() {}

        public RemovingTime(double time)
        {
            if (!IsValid(time)) 
                throw new BusinessRuleValidationException("Business Error - Removing Time is invalid. ");
            
            this.removingTime = time;
        }
        
        // Maximum removing time is 1 hour, minimum is 1 minute
        public bool IsValid(double time) {
            return time >= 1 & time <= 60; 
        }
        
    }

}
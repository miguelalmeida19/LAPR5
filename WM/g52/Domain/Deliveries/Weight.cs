using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Deliveries
{
    public class Weight : IValueObject
    {
        public double weight { get; set; }
        
        public Weight() {}

        public Weight(double weight)
        {
            if (!IsValid(weight)) 
                throw new BusinessRuleValidationException("Business Error - Weight must be positive. ");
            
            this.weight = weight;
        }
        
        // Weight must be positive and under 1000kg
        public bool IsValid(double weight) {
            return weight > 0 && weight < 100000.0; 
        }
        
    }
}
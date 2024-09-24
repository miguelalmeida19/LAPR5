using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Deliveries
{

    public class DueDate : IValueObject
    {
        public int day { get; set; }
        
        public int month { get; set; }
        
        public int year { get; set; }
        
        public DueDate() {}

        public DueDate(int day, int month, int year)
        {
            if (!IsValidDay(day) || !IsValidMonth(month) || !IsValidYear(year)) 
                throw new BusinessRuleValidationException("Business Error - Delivery's Due Date is invalid. ");

            this.day = day;
            this.month = month;
            this.year = year;
        }

        private static bool IsValidDay(int value)
        {
            return value is > 0 and <= 31;
        }
        
        private static bool IsValidMonth(int value)
        {
            return value is > 0 and <= 12;
        }
        
        private static bool IsValidYear(int value)
        {
            return value is > 2021 and <= 2050;
        }
    }
}
using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Shared;

namespace tests.UnitTests.WM.DeliveryTests
{
 public class DueDateTest
 {
     private const int day = 1;
     private const int month = 1;
     private const int year = 2022;
     
     [Fact]
     public void SuccessfullyCreateDueDate()
     {
         var testDueDate = new DueDate(day, month, year);
         Assert.Equal(day, testDueDate.day);
         Assert.Equal(month, testDueDate.month);
         Assert.Equal(year, testDueDate.year);
     }
 
     [Fact]
     public void FailCreateDueDateInvalidDayUnder()
     {
         Assert.Throws<BusinessRuleValidationException>(() => new DueDate(-1, month, year));
     }
     
     [Fact]
     public void FailCreateDueDateInvalidDayOver()
     {
         Assert.Throws<BusinessRuleValidationException>(() => new DueDate(32, month, year));
     }
     
     [Fact]
     public void FailCreateDueDateInvalidMonthUnder()
     {
         Assert.Throws<BusinessRuleValidationException>(() => new DueDate(day, -1, year));
     }
     
     [Fact]
     public void FailCreateDueDateInvalidMonthOver()
     {
         Assert.Throws<BusinessRuleValidationException>(() => new DueDate(day, 13, year));
     }
     
     [Fact]
     public void FailCreateDueDateInvalidYearUnder()
     {
         Assert.Throws<BusinessRuleValidationException>(() => new DueDate(day, month, 2021));
     }
     
     [Fact]
     public void FailCreateDueDateInvalidYearOver()
     {
         Assert.Throws<BusinessRuleValidationException>(() => new DueDate(day, month, 2051));
     }
 }   
}
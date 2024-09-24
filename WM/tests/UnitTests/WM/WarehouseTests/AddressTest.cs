using System;
using EletricGo.WM.Domain.Warehouses;

namespace tests.UnitTests.WM.WarehouseTests
{
    public class AddressTest
    {
        [Fact]
        public void SuccessfullyCreateAddress()
        {
            const string street = "Rua Fixe01";
            const string postalCode = "4420-603";
            const string location = "Gondomar";
            var c = new Address(street, postalCode, location);
            Assert.Equal(street, c.street);
            Assert.Equal(postalCode, c.postalCode);
            Assert.Equal(location, c.location);
        }
    
        [Fact]
        public void FailToCreateAddressWithEmptyStreet()
        {
            Assert.Throws<Exception>(() => new Address("", "4420-500", "Portugal"));
        }
            
        [Fact]
        public void FailToCreateAddressWithEmptyPostalCode()
        {
            Assert.Throws<Exception>(() => new Address("Rua", "", "Portugal"));
        }
            
        [Fact]
        public void FailToCreateAddressWithEmptyLocation()
        {
            Assert.Throws<Exception>(() => new Address("Rua", "4420-700", ""));
        }
    
        [Fact]
        public void FailToCreateAddressWithMoreThan4InitialDigitsInPostalCode()
        {
            Assert.Throws<Exception>(() => new Address("Rua Fixe02", "12345-123", "Gondomar"));
        }
            
        [Fact]
        public void FailToCreateAddressWithMoreThan3FinalDigitsInPostalCode()
        {
            Assert.Throws<Exception>(() => new Address("Rua Fixe02", "1245-1123", "Gondomar"));
        }
    
        [Fact]
        public void FailToCreateAddressWithNullPostalCode()
        {
            Assert.Throws<ArgumentNullException>(() => new Address("Rua", null, "Portugal"));
        }
            
        [Fact]
        public void FailToCreateAddressWithNullStreet()
        {
            Assert.Throws<Exception>(() => new Address(null, "4420-500", "Portugal"));
        }
            
        [Fact]
        public void FailToCreateAddressWithNullLocation()
        {
            Assert.Throws<Exception>(() => new Address("Rua", "4420-700", null));
        }
    }
}
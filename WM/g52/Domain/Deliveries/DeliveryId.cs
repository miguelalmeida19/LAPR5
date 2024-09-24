using System;
using System.Text.RegularExpressions;
using EletricGo.WM.Domain.Shared;
using Newtonsoft.Json;

namespace EletricGo.WM.Domain.Deliveries
{
    public class DeliveryId : EntityId
    {
        [JsonConstructor]
        public DeliveryId(string value) : base(value)
        {
            if (!IsValid(value))
            {
                throw new Exception("Invalid Delivery ID");
            }
        }

        override
            protected Object createFromString(String text)
        {
            return new string(text);
        }

        override
            public String AsString()
        {
            return base.Value;
        }
        
        private bool IsValid(string value)
        {
        
            if (!String.IsNullOrEmpty(value) & value.Length == 3 & Regex.IsMatch(value, "^[a-zA-Z0-9]*$") )
            {
                return true;
            }
            return false;
        }
    }
}
using System;
using System.Text.RegularExpressions;
using EletricGo.WM.Domain.Shared;
using Newtonsoft.Json;

namespace EletricGo.WM.Domain.Warehouses
{

    public class WarehouseId : EntityId
    {
        [JsonConstructor]
        public WarehouseId(string value) : base(value)
        {
            if (!isValid(value))
            {
                throw new Exception("Invalid ID! ID should be an alphanumeric with 3 chars.");
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
        
        private bool isValid(string value)
        {
        
            if (!String.IsNullOrEmpty(value) & value.Length == 3 & Regex.IsMatch(value, "^[a-zA-Z0-9]*$") )
            {
                return true;
            }
            return false;
        }
        
    }
}
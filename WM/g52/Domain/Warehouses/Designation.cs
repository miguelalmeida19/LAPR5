using System;
using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Warehouses
{

    public class Designation : IValueObject
    {
        public string designation { get; set; }

        public Designation()
        {
        }

        public Designation(string designation)
        {
            if (String.IsNullOrWhiteSpace(designation))
            {
                throw new Exception("Need to introduce designation!");
            }else if (designation.Length > 50)
            {
                throw new Exception("This designation exceeded chars limit!");
            }
            this.designation = designation;
        }
        
        public bool isValid(string designation)
        {
            if (designation.Length < 50 & designation.Length > 0)
                return true;

            return false;
        }

        public override string ToString()
        {
            return $"{designation}";
        }
    }
}
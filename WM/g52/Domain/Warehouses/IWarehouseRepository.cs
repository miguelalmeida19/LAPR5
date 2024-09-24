using System.Collections.Generic;
using System.Threading.Tasks;
using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Domain.Warehouses
{

    public interface IWarehouseRepository : IRepository<Warehouse, WarehouseId>
    {
    }
}
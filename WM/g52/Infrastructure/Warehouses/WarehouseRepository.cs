using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EletricGo.WM.Domain.Warehouses;
using EletricGo.WM.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace EletricGo.WM.Infrastructure.Warehouses
{

    public class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>, IWarehouseRepository
    {
        public WarehouseRepository(EletricGoDbContext context) : base(context.Warehouses)
        {
            context.Database.EnsureCreated();
        }
    }
}
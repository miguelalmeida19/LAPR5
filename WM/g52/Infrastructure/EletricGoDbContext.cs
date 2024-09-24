using EletricGo.WM.Domain.Warehouses;
using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Infrastructure.Warehouses;
using EletricGo.WM.Infrastructure.Deliveries;
using Microsoft.EntityFrameworkCore;

namespace EletricGo.WM.Infrastructure
{
    public class EletricGoDbContext : DbContext
    {
        public DbSet<Warehouse> Warehouses { get; set; }
        
        public DbSet<Delivery> Deliveries { get; set; }

        public EletricGoDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DeliveryEntityTypeConfiguration());
        }
    }
}
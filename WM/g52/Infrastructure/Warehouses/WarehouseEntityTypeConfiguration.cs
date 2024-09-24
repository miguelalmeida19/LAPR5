using EletricGo.WM.Domain.Warehouses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EletricGo.WM.Infrastructure.Warehouses
{

    internal class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            //builder.ToTable("Warehouses", SchemaNames.EletricGo);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.Designation);
            builder.OwnsOne(b => b.Address);
            builder.OwnsOne(b => b.Latitude);
            builder.OwnsOne(b => b.Longitude);
           // builder.OwnsOne(b => b.Active);
            builder.Property(b => b.Active);
        }
    }
}
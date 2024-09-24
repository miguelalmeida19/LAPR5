using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Domain.Warehouses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EletricGo.WM.Infrastructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            // builder.ToTable("Deliveries", SchemaNames.EletricGo);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.Weight);
            builder.OwnsOne(b => b.DueDate);
            builder.OwnsOne(b => b.PlacingTime);
            builder.OwnsOne(b => b.RemovingTime);
            builder.OwnsOne(b => b.PackageDimension);
        }
    }
}
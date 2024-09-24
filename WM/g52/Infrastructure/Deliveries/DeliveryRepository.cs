using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Infrastructure.Shared;

namespace EletricGo.WM.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>, IDeliveryRepository
    {
        public DeliveryRepository(EletricGoDbContext context) : base(context.Deliveries)
        {
            context.Database.EnsureCreated();
        }
    }
}
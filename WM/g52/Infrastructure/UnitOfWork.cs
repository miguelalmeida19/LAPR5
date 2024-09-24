using System.Threading.Tasks;
using EletricGo.WM.Domain.Shared;

namespace EletricGo.WM.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EletricGoDbContext _context;

        public UnitOfWork(EletricGoDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}
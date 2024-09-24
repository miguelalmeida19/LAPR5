using System.Threading.Tasks;

namespace EletricGo.WM.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}
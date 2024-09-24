using System;
using System.Threading.Tasks;
using EletricGo.WM.Domain.Shared;
using EletricGo.WM.Domain.Warehouses;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace tests.UnitTests.WM.WarehouseTests
{
    public class WarehouseServiceTest
{
    private readonly Mock<IUnitOfWork> _unit;
    private readonly Mock<IWarehouseRepository> _repo;
    private readonly WarehouseService _service;
    private CreatingWarehouseDto cwdto;
    private EletricGo.WM.Domain.Warehouses.Warehouse _warehouse;
    private WarehouseDto wdto;
    
    /*
     *     public WarehouseServiceTest()
    {
        _unit = new Mock<IUnitOfWork>();
        _repo = new Mock<IWarehouseRepository>();
        _service = new WarehouseService(_unit.Object, _repo.Object);
        _unit.Setup(x => x.CommitAsync()).Returns(Task.FromResult(1));

        cwdto = new CreatingWarehouseDto("W01", "Warehouse 01, porto", "Rua do Sergio Conceicao", "4420-800", "Porto",
            50.0, 10.0);

        _warehouse = new Warehouse("W01", "Warehouse 01, porto", "Rua do Sergio Conceicao", "4420-800", "Porto", 50.0, 10.0);
        wdto = new WarehouseDto("W01", "Warehouse 01, porto", "Rua do Sergio Conceicao", "4420-800", "Porto", 50.0,
            10.0, true);
    }

    [Fact]
    public async void throwBusinessRuleExceptionWhenDataIsInvalid()
    {
        var dto = new CreatingWarehouseDto("", "", "", "", "",  100.0, 200.0);
        await Assert.ThrowsAsync<Exception>(() => _service.AddAsync(dto));
    }

    [Fact]
    public async void returnExpectedObjectWhenWarehouseIsRegisteredSuccessfully()
    {
        _repo.Setup(x => x.AddAsync(It.IsAny<EletricGo.WM.Domain.Warehouses.Warehouse>()))
            .Returns(Task.FromResult<EletricGo.WM.Domain.Warehouses.Warehouse>(_warehouse));
        var res = await _service.AddAsync(cwdto);
        Assert.Equal(wdto.Id,res.Id);
        Assert.Equal(wdto.designation,res.designation);
        Assert.Equal(wdto.street,res.street);
        Assert.Equal(wdto.postalCode,res.postalCode);
        Assert.Equal(wdto.location,res.location);
        Assert.Equal(wdto.latitude,res.latitude);
        Assert.Equal(wdto.longitude,res.longitude);
    }

    [Fact]
    public async void ThrowDBExceptionWhenUpdatingWithWarehouseAlreadyRegistered()
    {
        _repo.Setup(x => x.AddAsync(It.IsAny<EletricGo.WM.Domain.Warehouses.Warehouse>()))
            .Returns(Task.FromResult<EletricGo.WM.Domain.Warehouses.Warehouse>(_warehouse));
        await _service.AddAsync(cwdto);
        _repo.Setup(x => x.AddAsync(It.IsAny<EletricGo.WM.Domain.Warehouses.Warehouse>()))
            .Throws(new DbUpdateException());
        await Assert.ThrowsAsync<DbUpdateException>(() => _service.AddAsync(cwdto));
    }
     */

}
}
using EletricGo.WM.Domain.Shared;
using EletricGo.WM.Domain.Warehouses;
using EletricGo.WM.Domain.Deliveries;
using EletricGo.WM.Infrastructure;
using EletricGo.WM.Infrastructure.Shared;
using EletricGo.WM.Infrastructure.Deliveries;
using EletricGo.WM.Infrastructure.Warehouses;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace EletricGo.WM
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));
            
            services.AddDbContext<EletricGoDbContext>(opt =>
                opt.UseSqlServer("server=vsgate-s1.dei.isep.ipp.pt,10448;Database=wm_database;User Id=sa;Password=u93HudGhsQ==Xa5")
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseForwardedHeaders();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseStaticFiles();

            app.UseCors("MyPolicy");
            
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
            
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<IWarehouseRepository, WarehouseRepository>();
            services.AddTransient<WarehouseService>();
            
            services.AddTransient<IDeliveryRepository, DeliveryRepository>();
            services.AddTransient<DeliveryService>();
        }
    }
}

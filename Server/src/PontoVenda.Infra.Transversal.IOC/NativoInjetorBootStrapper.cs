using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using PontoVenda.Domain.Contratos.Repositorios;
using PontoVenda.Infra.Dados.Contexto;
using PontoVenda.Infra.Dados.Repositorio;
using System;
using System.Collections.Generic;
using System.Text;

namespace PontoVenda.Infra.Transversal.IOC
{
    public class NativoInjetorBootStrapper
    {
        public static void RegistroServicos(IServiceCollection services)
        {
            //ASPNet            
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton(Mapper.Configuration);
            services.AddScoped<IMapper>(sp => new Mapper(sp.GetRequiredService<IConfigurationProvider>(), sp.GetService));

            //Infra - Dados
            services.AddScoped<IClienteRepositorio, ClienteRepositorio>();
            services.AddScoped<AppDataBaseContexto>();
        }
    }
}

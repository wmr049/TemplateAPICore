using AutoMapper;
using PontoVenda.Domain.Models;
using PontoVenda.Services.API.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PontoVenda.Services.API.AutoMapper
{
    public partial class AutoMapperConfiguracao
    {
        public class DominioParaViewModelMapeamentoPerfil : Profile
        {
            public DominioParaViewModelMapeamentoPerfil()
            {
                CreateMap<Cliente, ClienteViewModel>();                
            }
        }
    }
}

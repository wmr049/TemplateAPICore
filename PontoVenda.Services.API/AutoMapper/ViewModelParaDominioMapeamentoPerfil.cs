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
        public class ViewModelParaDominioMapeamentoPerfil : Profile
        {
            public ViewModelParaDominioMapeamentoPerfil()
            {
                CreateMap<ClienteViewModel, Cliente>();
            }
        }
    }   
}

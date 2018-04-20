using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PontoVenda.Services.API.AutoMapper
{
    public partial class AutoMapperConfiguracao
    {
        public static MapperConfiguration RegistrarMapemanetos()
        {
            return new MapperConfiguration(ps =>
            {
                ps.AddProfile(new DominioParaViewModelMapeamentoPerfil());
                ps.AddProfile(new ViewModelParaDominioMapeamentoPerfil());
            });
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using PontoVenda.Domain.Contratos.Repositorios;
using Microsoft.AspNetCore.Authorization;
using PontoVenda.Services.API.ViewModels;

namespace PontoVenda.Services.API.Controllers
{
    public class ClienteController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IClienteRepositorio _repositorio;

        public ClienteController(IMapper mapper, IClienteRepositorio repositorio)
        {
            _repositorio = repositorio;
            _mapper = mapper;

        }
        [HttpGet]
        [Route("clientes")]
        [AllowAnonymous]
        public IEnumerable<ClienteViewModel> Get()
        {
            return _mapper.Map<IEnumerable<ClienteViewModel>>(_repositorio.BuscarTodos());
        }
    }
}

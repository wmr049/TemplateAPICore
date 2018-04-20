using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace PontoVenda.Services.API.Controllers
{
    public class BaseController : Controller
    {
        protected void NotificarErroModelInvalida()
        {
            var erros = ModelState.Values.SelectMany(v => v.Errors);
            foreach (var erro in erros)
            {
                var erroMsg = erro.Exception == null ? erro.ErrorMessage : erro.Exception.Message;
                NotificarErro(string.Empty, erroMsg);
            }
        }
    }
}

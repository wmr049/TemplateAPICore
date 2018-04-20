using Dapper;
using Microsoft.EntityFrameworkCore;
using PontoVenda.Domain.Contratos.Repositorios;
using PontoVenda.Domain.Models;
using PontoVenda.Infra.Dados.Contexto;
using System.Collections.Generic;

namespace PontoVenda.Infra.Dados.Repositorio
{
    public class ClienteRepositorio : Repositorio<Cliente>, IClienteRepositorio
    {
        public ClienteRepositorio(AppDataBaseContexto contexto) : base(contexto)
        {
        }

        public override IEnumerable<Cliente> BuscarTodos()
        {
            var sql = "SELECT * FROM CLIENTES E " +                      
                      "ORDER BY E.NOME DESC";

            return Db.Database.GetDbConnection().Query<Cliente>(sql);
        }
    }
}

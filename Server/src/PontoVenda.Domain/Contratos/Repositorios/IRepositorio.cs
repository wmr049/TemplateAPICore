using PontoVenda.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace PontoVenda.Domain.Contratos.Repositorios
{
    public interface IRepositorio<TEntity> : IDisposable where TEntity : Entity<TEntity>
    {
        void Adicionar(TEntity obj);
        TEntity BuscarPorId(Guid id);
        IEnumerable<TEntity> BuscarTodos();
        void Atualizar(TEntity obj);
        void Remover(Guid id);
        IEnumerable<TEntity> Procurar(Expression<Func<TEntity, bool>> predicado);
        int SalvarAlteracoes();

    }
}

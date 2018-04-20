using Microsoft.EntityFrameworkCore;
using PontoVenda.Domain.Contratos.Repositorios;
using PontoVenda.Domain.Models;
using PontoVenda.Infra.Dados.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace PontoVenda.Infra.Dados.Repositorio
{
    public abstract class Repositorio<TEntity> : IRepositorio<TEntity> where TEntity : Entity<TEntity>
    {

        protected AppDataBaseContexto Db;
        protected DbSet<TEntity> DbSet;

        protected Repositorio(AppDataBaseContexto contexto)
        {
            Db = contexto;
            DbSet = Db.Set<TEntity>();
        }

        public virtual void Adicionar(TEntity obj)
        {
            DbSet.Add(obj);
        }

        public virtual TEntity BuscarPorId(Guid id)
        {
            return DbSet.AsNoTracking().FirstOrDefault(t => t.Id == id);
        }

        public virtual IEnumerable<TEntity> BuscarTodos()
        {
            return DbSet.ToList();
        }

        public virtual void Atualizar(TEntity obj)
        {
            DbSet.Update(obj);
        }

        public virtual void Remover(Guid id)
        {
            DbSet.Remove(DbSet.Find(id));
        }

        public virtual IEnumerable<TEntity> Procurar(Expression<Func<TEntity, bool>> predicado)
        {
            return DbSet.AsNoTracking().Where(predicado);
        }

        public int SalvarAlteracoes()
        {
            return Db.SaveChanges();
        }

        public void Dispose()
        {
            Db.Dispose();
        }
    }
}

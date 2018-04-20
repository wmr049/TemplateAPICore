using Microsoft.EntityFrameworkCore;

namespace PontoVenda.Infra.Dados.Extensoes
{
    public static class ModeloConstrutorExtensao
    {
        public static void AdicionarConfiguracao<TEntity>(this ModelBuilder modelBuilder,
            EntidadeTipoConfiguracao<TEntity> configuracao) where TEntity : class
        {
            configuracao.Mapa(modelBuilder.Entity<TEntity>());
        }
    }
}

using PontoVenda.Domain.Models;
using PontoVenda.Infra.Dados.Extensoes;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace PontoVenda.Infra.Dados.Mapeamentos
{
    public class ClienteMapeamento : EntidadeTipoConfiguracao<Cliente>
    {
        public override void Mapa(EntityTypeBuilder<Cliente> construtor)
        {
            construtor
                .Property(e => e.Nome)
                .HasColumnType("varchar(150)")
                .IsRequired();

            construtor
                .Ignore(e => e.ValidationResult);

            construtor
                .Ignore(e => e.CascadeMode);

            construtor
                .ToTable("Clientes");
        }
    }
}

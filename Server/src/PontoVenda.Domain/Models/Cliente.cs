using FluentValidation;
using FluentValidation.Results;
using System;

namespace PontoVenda.Domain.Models
{
    public class Cliente : Entity<Cliente>
    {
        public Cliente(
            string nome,
            string cpf
            )
        {
            Id = Guid.NewGuid();
            Nome = nome;
            CPF = cpf;
        }

        private Cliente() { }

        public string Nome { get; private set; }
        public string CPF { get; private set; }


        public override bool EhValido()
        {
            Validar();
            return ValidationResult.IsValid;
        }

        private void Validar()
        {
            ValidarNome();
            //ValidarCPF(); 
        }

        private void ValidarCPF()
        {
            throw new NotImplementedException();
        }

        private void ValidarNome()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("O nome do cliente precisa ser fornecido")
                .Length(2, 150).WithMessage("O nome do cliente precisa ter entre 2 e 150 caracteres");
        }
    }
}
    
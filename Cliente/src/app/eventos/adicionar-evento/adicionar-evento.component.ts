import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { Evento, Endereco, Categoria } from '../models/evento';
import { GenericValidator } from '../../../app/utils/forms.generic.validator';
import { EventoService } from '../services/evento.service';
import { CurrencyUtils } from '../../utils/currency.utils';
import { DateUtils } from '../../utils/date.utils';

@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.component.html',
  styleUrls: ['./adicionar-evento.component.css']
})
export class AdicionarEventoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  eventoForm: FormGroup;
  evento: Evento;
  categorias: Categoria[];
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastsManager,
    private eventoService: EventoService,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      dataInicio: {
        required: 'Informe a data de início'
      },
      dataFim: {
        required: 'Informe a data de encerramento'
      },
      categoriaId: {
        required: 'Informe a categoria'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Evento();
    this.evento.endereco = new Endereco();

  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  ngOnInit() {
    this.eventoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      categoriaId: ['', Validators.required],
      descricaoCurta: '',
      descricaoLonga: '',
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      gratuito: '',
      valor: '0',
      online: '',
      nomeEmpresa: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
    });

    this.eventoService.obterCategorias()
      .subscribe(
      categorias => this.categorias = categorias,
      error => this.errors);
  }

  adicionarEvento() {
    if (this.eventoForm.dirty && this.eventoForm.valid) {
      let user = this.eventoService.obterUsuario();

      let e = Object.assign({}, this.evento, this.eventoForm.value);
      e.organizadorId = user.id;

      e.valor = CurrencyUtils.ToDecimal(e.valor);
      e.dataInicio = DateUtils.getMyDatePickerDate(e.dataInicio);
      e.dataFim = DateUtils.getMyDatePickerDate(e.dataFim);
      e.endereco.logradouro = e.logradouro;
      e.endereco.numero = e.numero;
      e.endereco.complemento = e.complemento;
      e.endereco.bairro = e.bairro;
      e.endereco.cep = e.cep;
      e.endereco.cidade = e.cidade;
      e.endereco.estado = e.estado;

      this.eventoService.registrarEvento(e)
        .subscribe(
        result => { this.onSaveComplete() },
        error => { this.onError(error) }
        );

    }
  }

  onError(error) {
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
    this.errors = JSON.parse(error._body).errors;
  }

  onSaveComplete(): void {
    this.eventoForm.reset();
    this.errors = [];

    this.toastr.success('Evento Registrado com Sucesso!', 'Oba :D', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/eventos']);
        }, 2500);
      });
  }
}

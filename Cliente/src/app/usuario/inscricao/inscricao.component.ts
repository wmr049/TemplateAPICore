import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Router } from "@angular/router";

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';

import { Organizador } from '../models/organizador';
import { OrganizadorService } from '../../services/organizador.service';
import { GenericValidator } from "../../utils/forms.generic.validator";

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html'
})
export class InscricaoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  inscricaoForm: FormGroup;
  organizador: Organizador;
  displayMessage: { [key: string]: string } = {};
  validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder,
    private organizadorService: OrganizadorService,
    private router: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        rangeLength: 'CPF deve conter 11 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      password: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres'
      },
      ConfirmPassword: {
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir no mínimo 6 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.organizador = new Organizador();

  }

  ngOnInit() {

    const password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    const ConfirmPassword = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(password)]);

    this.inscricaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, CustomValidators.rangeLength([11, 11])]],
      email: ['', [Validators.required, CustomValidators.email]],
      password: password,
      ConfirmPassword: ConfirmPassword
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);
    });
  }

  adicionarOrganizador() {
    if (this.inscricaoForm.dirty && this.inscricaoForm.valid) {
      // add o cara no banco
      const o = Object.assign({}, this.organizador, this.inscricaoForm.value);

      this.organizadorService.registrarOrganizador(o)
        .subscribe(
        result => { this.onSaveComplete(result); },
        error => { this.onSaveError(error); }
        );
    }
  }

  onSaveError(error: any): void {
    this.errors = JSON.parse(error._body).errors;
    this.toastr.error('Ocorreu um erro ao registrar o usuario', 'Ops :(' );
  }

  onSaveComplete(response: any): void {
    this.inscricaoForm.reset();
    this.errors = [];

    localStorage.setItem('eio.token', response.result.access_token);
    localStorage.setItem('eio.user', JSON.stringify(response.result.user));

    this.toastr.success('Organizador registrado com sucesso', 'Bem Vindo !!', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/eventos']);
        }, 3500);
      });
  }

}

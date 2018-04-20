import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Organizador } from '../usuario/models/organizador';
import { ServiceBase } from './service.base';



@Injectable()
export class OrganizadorService extends ServiceBase {

    constructor(private http: Http) { super(); }

    registrarOrganizador(organizador: Organizador): Observable<Organizador> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        const response = this.http
            .post(this.UrlServiceV1 + 'nova-conta', organizador, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
    }

    login(organizador: Organizador): Observable<Organizador> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        const response = this.http
            .post(this.UrlServiceV1 + 'conta ', organizador, options)
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    }
}

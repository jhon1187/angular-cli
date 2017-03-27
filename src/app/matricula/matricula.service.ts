import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Matricula } from "app/matricula/objects/matricula";

@Injectable()
export class MatriculaService {

  private url: string = "http://dr-25023/Sig/api/matriculas";
  private urlAluno: string = "http://demo7540274.mockable.io/aluno";
  private urlTurmas: string = "http://demo7540274.mockable.io/turmas";

  headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  getAluno(id) {
    return this.http.get(this.urlAluno)
      .map(res => res.json());
  }

  getTurmas() {
    return this.http.get(this.urlTurmas)
      .map(res => res.json());
  }

  addMatricula(matricula: Matricula) {
    return this.http.post(this.url, JSON.stringify(matricula), { headers: this.headers })
      .map(res => res.json());
  }

}

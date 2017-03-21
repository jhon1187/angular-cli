import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class MatriculaService {

  private url: string = "http://jsonplaceholder.typicode.com/sig/matricula";
  private urlAluno: string = "http://demo7540274.mockable.io/aluno";
  private urlTurmas: string = "http://demo7540274.mockable.io/turmas";

  constructor(private http: Http) { }

  getAluno(id) {
    return this.http.get(this.urlAluno)
      .map(res => res.json());
  }

  getTurmas() {
    return this.http.get(this.urlTurmas)
      .map(res => res.json());
  }

  addMatricula(matricula) {
    return this.http.post(this.url, JSON.stringify(matricula))
      .map(res => res.json());
  }

}

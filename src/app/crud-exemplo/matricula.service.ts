import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MatriculaService {

  private url: string = "http://jsonplaceholder.typicode.com/matricula";

  constructor(private http: Http) { }

  getMatriculas() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getMatricula(id) {
    return this.http.get(this.getMatriculaUrl(id))
      .map(res => res.json());
  }

  addMatricula(matricula) {
    return this.http.post(this.url, JSON.stringify(matricula))
      .map(res => res.json());
  }

  updateMatricula(matricula) {
    return this.http.put(this.getMatriculaUrl(matricula.id), JSON.stringify(matricula))
      .map(res => res.json());
  }

  deleteMatricula(id) {
    return this.http.delete(this.getMatriculaUrl(id))
      .map(res => res.json());
  }

  private getMatriculaUrl(id) {
    return this.url + "/" + id;
  }
}

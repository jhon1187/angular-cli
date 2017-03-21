import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Matricula } from '../entities/matricula';
import { Aluno } from '../entities/aluno';
import { Turma } from '../entities/turma';

import { MatriculaService } from '../matricula.service';

@Component({
  selector: 'app-matricula-form',
  templateUrl: './matricula-form.component.html',
  styleUrls: ['./matricula-form.component.css']
})
export class MatriculaFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  matricula: Matricula = new Matricula();
  aluno : Aluno = new Aluno();
  turmas : any = {};

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matriculaService: MatriculaService
  ) {
    this.form = formBuilder.group({
      aluno: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: [],
      phone: [],
      address: formBuilder.group({
        street: ['', Validators.minLength(3)],
        suite: [],
        city: ['', Validators.maxLength(30)],
        zipcode: ['', Validators.pattern('^([0-9]){5}([-])([0-9]){4}$')]
      })
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var alunoId = params['alunoId'];

      this.title = 'Nova Matricula';
 
      this.matriculaService.getAluno(alunoId).subscribe(
        aluno => this.aluno = aluno,
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
      });

      this.turmas = {'apple': null, 'google': null};
    });
  }

  save() {
    var result, matriculaValue = this.form.value;
   
    result = this.matriculaService.addMatricula(matriculaValue);

    result.subscribe(data => this.router.navigate(['matricula/form']));
  }
}

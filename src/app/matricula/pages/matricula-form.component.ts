import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Matricula } from '../entities/matricula';
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

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matriculaService: MatriculaService
  ) {
    this.form = formBuilder.group({
      name: ['', [
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
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = 'Nova Matricula';

      if (!id)
        return;

      this.matriculaService.getMatricula(id)
        .subscribe(
        matricula => this.matricula = matricula,
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
    });
  }

  save() {
    var result, matriculaValue = this.form.value;
   
    result = this.matriculaService.addMatricula(matriculaValue);

    result.subscribe(data => this.router.navigate(['matricula']));
  }
}

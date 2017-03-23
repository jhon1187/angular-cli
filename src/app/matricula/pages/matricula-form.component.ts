import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Matricula } from '../entities/matricula';
import { Aluno } from '../entities/aluno';
import { Turma } from '../entities/turma';
import { FormaPagamento } from '../entities/formaPagamento';

import { MatriculaForm } from './matricula-form';

import { MatriculaService } from '../matricula.service';
import { CurrencyPipe } from "../../shared/components/currency.pipe";

@Component({
  selector: 'app-matricula-form',
  templateUrl: './matricula-form.component.html',
  styleUrls: ['./matricula-form.component.css']
})
export class MatriculaFormComponent implements OnInit {

  form: FormGroup;
  title: string = "";

  turmasAutoComplete: any = {};
  turmaAutoCompleteSelected: string = "";

  matricula: Matricula = new Matricula();
  aluno: Aluno = new Aluno();
  turma: Turma = new Turma();
  turmas: Turma[] = [];
  valorTotal: number = null;

  formasPagamento: FormaPagamento[] = [];

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matriculaService: MatriculaService,
    private currencyPipe: CurrencyPipe
  ) {
    this.form = formBuilder.group({
      turma: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      aluno: ['', [
        Validators.required
      ]],
      valorTotal: ['', [
        Validators.required
      ]]
      // , address: formBuilder.group({
      //   street: ['', Validators.minLength(3)],
      //   suite: [],
      //   city: ['', Validators.maxLength(30)],
      //   zipcode: ['', Validators.pattern('^([0-9]){5}([-])([0-9]){4}$')]
      // })
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

      this.matriculaService.getTurmas().subscribe(
        turmas => {
          this.turmas = turmas;
          this.gerarTurmasAutoComplete();
        },
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
    });
  }

  gerarTurmasAutoComplete() {
    let autoCompleteObj = {};

    this.turmas.forEach(turma => {
      let valorAutoComplete: string = turma.id + " - " + turma.nome;
      let iconeAutoComplete: string = null;

      autoCompleteObj[valorAutoComplete] = iconeAutoComplete;
    });

    this.turmasAutoComplete = autoCompleteObj;
  }

  turmaAlterada() {
    if (this.turmaAutoCompleteSelected == "") {
      this.valorTotal = null;
      return;
    }

    let turmaSelectedSplit: string[] = this.turmaAutoCompleteSelected.split("-");
    let idTurma = Number(turmaSelectedSplit[0].trim());

    if (isNaN(idTurma)) {
      this.valorTotal = null;
      return;
    }

    let turma = this.turmas.find(turma => {
      return (turma.id == idTurma);
    });

    this.valorTotal = (turma.valor / 100);
    this.formasPagamento = turma.formasPagamento;
  }

  save() {
    let result, matriculaValue = this.form.value;

    result = this.matriculaService.addMatricula(matriculaValue);

    result.subscribe(data => this.router.navigate(['matricula/form']));
  }
}

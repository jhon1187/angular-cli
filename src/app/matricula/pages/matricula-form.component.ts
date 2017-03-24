import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Aluno } from '../entities/aluno';
import { Turma } from '../entities/turma';

import { MatriculaForm } from '../entities/matricula-form';

import { MatriculaService } from '../matricula.service';
import { CurrencyPipe } from "../../shared/components/currency.pipe";
import { FormaPagamentoForm } from "app/matricula/components/entities/forma-pagemento-form";

@Component({
  selector: 'app-matricula-form',
  templateUrl: './matricula-form.component.html',
  styleUrls: ['./matricula-form.component.css']
})
export class MatriculaFormComponent implements OnInit {

  form: FormGroup;
  title: string = null;

  model: MatriculaForm = new MatriculaForm();

  turmasAutoComplete: any = {};

  turmas: Turma[] = [];

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
        aluno => this.model.aluno = aluno,
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

    if (!this.model.turma || !this.model.turma.nome ||this.model.turma.nome.trim() == "") {
      this.model.valorTotal = null;
      return;
    }

    let turmaSelectedSplit: string[] = this.model.turma.nome.split("-");
    let idTurma = Number(turmaSelectedSplit[0].trim());

    if (isNaN(idTurma)) {
      this.model.valorTotal = null;
      return;
    }

    let turma = this.turmas.find(turma => {
      return (turma.id == idTurma);
    });

    this.model.valorTotal = (turma.valor / 100);
    this.model.turma.formasPagamento = turma.formasPagamento;
    this.model.formaPagamentoForm = new FormaPagamentoForm();
  }

  save() {
    let result, matriculaValue = this.form.value;

    result = this.matriculaService.addMatricula(matriculaValue);

    result.subscribe(data => this.router.navigate(['matricula/form']));
  }
}

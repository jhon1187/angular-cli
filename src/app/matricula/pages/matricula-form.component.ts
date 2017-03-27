import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Aluno } from '../entities/aluno';
import { Turma } from '../entities/turma';

import { MatriculaForm } from '../entities/matricula-form';

import { MatriculaService } from '../matricula.service';
import { FormaPagamentoForm } from "app/matricula/components/entities/forma-pagemento-form";
import { Matricula } from "app/matricula/entities/matricula";

declare var Materialize: any;

@Component({
  selector: 'app-matricula-form',
  templateUrl: './matricula-form.component.html',
  styleUrls: ['./matricula-form.component.css']
})
export class MatriculaFormComponent implements OnInit {
  form: FormGroup;
  title: string = null;

  model: MatriculaForm = new MatriculaForm();

  turmas: Turma[] = [];
  turmasAutoComplete: any = {};
  turmaSelecionada: string = null;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matriculaService: MatriculaService,
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

      this.title = 'Nova Matrícula';

      this.matriculaService.getAluno(alunoId).subscribe(aluno => this.model.aluno = aluno);

      this.matriculaService.getTurmas().subscribe(
        turmas => {
          this.turmas = turmas;
          this.gerarTurmasAutoComplete();
        }
      );
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
    this.model.turma = null;
    this.model.valorTotal = null;
    this.model.formaPagamentoForm = null;

    if (this.turmaSelecionada == null || this.turmaSelecionada.trim() == "") {
      return;
    }

    let turmaSelectedSplit: string[] = this.turmaSelecionada.split("-");
    let idTurma = turmaSelectedSplit[0].trim();

    if (idTurma == null || idTurma == "") {
      return;
    }

    this.model.turma = this.turmas.find(turma => {
      return (turma.id == idTurma);
    });

    if (!this.model.turma) {
      return null;
    }

    this.model.valorTotal = (this.model.turma.valor / 100);
    this.model.formaPagamentoForm = new FormaPagamentoForm();
  }

  save() {
    let matricula: Matricula = new Matricula();

    matricula.turmaId = this.model.turma.id;
    matricula.alunoId = this.model.aluno.id;
    matricula.formaPagamento = this.model.formaPagamentoForm.tipoPagamento;
    matricula.quantidadeParcelas = this.model.formaPagamentoForm.parcela.quantidade;

    this.matriculaService.addMatricula(matricula).subscribe(
      data => {
        this.router.navigate(['matricula/form'])
      },
      response => {
        if (response.status == "200") {
          Materialize.toast('Matrícula realizada com sucesso!');
        } else {
          Materialize.toast('Houve um erro ao tentar realizar a Matrícula!');
        }
      }
    );
  }
}

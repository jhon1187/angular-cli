import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Aluno } from '../objects/aluno';
import { Turma } from '../objects/turma';

import { MatriculaForm } from '../objects/matricula-form';

import { MatriculaService } from '../matricula.service';
import { FormaPagamentoForm } from "app/matricula/components/objects/forma-pagemento-form";
import { Matricula } from "app/matricula/objects/matricula";

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

  matriculaRealizada() {
    return (this.model.matriculaId != null && this.model.matriculaId != "");
  }

  gerarTurmasAutoComplete() {
    let autoCompleteObj = {};

    this.turmas.forEach(turma => {
      let valorAutoComplete: string = turma.id + " | " + turma.nome;
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

    let turmaSelectedSplit: string[] = this.turmaSelecionada.split("|");
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

  matricular() {
    let matricula: Matricula = new Matricula();

    matricula.turmaId = this.model.turma.id;
    matricula.alunoId = this.model.aluno.id;

    this.matriculaService.addMatricula(matricula).subscribe(
      data => {
        Materialize.toast('Matrícula realizada com sucesso!', 4000);
        this.model.matriculaId = data.matriculaId;
      },
      response => {
        if (response.status != "200") {
          let content: any[] = JSON.parse(response._body);
          content.forEach(data => {
            Materialize.toast(data.value, 4000);
          });
        }
      }
    );
  }

  efetuarPagemento() {
    let matricula: Matricula = new Matricula();

    matricula.formaPagamento = this.model.formaPagamentoForm.tipoPagamento;
    matricula.quantidadeParcelas = this.model.formaPagamentoForm.parcela.quantidade;
    matricula.cartao = this.model.formaPagamentoForm.cartao;

    this.matriculaService.efetuarPagamento(matricula).subscribe(
      data => {
        Materialize.toast('Pagamento Efetuado com sucesso!', 4000);
        this.router.navigate(['']);
      },
      response => {
        if (response.status != "200") {
          Materialize.toast('Erro ao Efetuar Pagamento!', 4000);
        }
      }
    );
  }
}

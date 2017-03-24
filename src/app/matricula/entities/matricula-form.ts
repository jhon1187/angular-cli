import { Turma } from './turma';
import { Aluno } from './aluno';
import { FormaPagamentoForm } from './../components/entities/forma-pagemento-form';

export class MatriculaForm {
  turma: Turma = new Turma();
  aluno: Aluno = new Aluno;
  valorTotal: number;
  formaPagamentoForm: FormaPagamentoForm;
}

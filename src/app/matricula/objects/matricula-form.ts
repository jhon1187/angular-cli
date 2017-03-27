import { Turma } from './turma';
import { Aluno } from './aluno';
import { FormaPagamentoForm } from './../components/objects/forma-pagemento-form';

export class MatriculaForm {
  matriculaId: string;
  turma: Turma = new Turma();
  aluno: Aluno = new Aluno;
  valorTotal: number;
  formaPagamentoForm: FormaPagamentoForm;
}

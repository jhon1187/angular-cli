import { FormaPagamentoForm } from './../components/entities/forma-pagemento-form';
import { Aluno } from './aluno';

export class MatriculaForm {
  turma: string;
  aluno: Aluno;
  valorTotal: number;
  formaPagamentoForm: FormaPagamentoForm;
}

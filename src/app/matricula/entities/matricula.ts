import {Turma} from './turma';
import {Aluno} from './aluno';
import {FormaPagamento} from './formaPagamento';

export class Matricula {
  id: number;
  turma: Turma;
  aluno: Aluno;
  formaPagamento: FormaPagamento;
}

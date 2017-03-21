import {FormaPagamento} from './formaPagamento';

export class Turma {
  id: number;
  nome: string;
  valor: number;
  formasPagamento: FormaPagamento[] = [];
}

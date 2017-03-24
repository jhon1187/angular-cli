import { FormaPagamento } from './../../crud-exemplo/entities/formaPagamento';
export class Turma {
  id: number;
  nome: string;
  valor: number;
  formasPagamento: FormaPagamento[] = [];
}

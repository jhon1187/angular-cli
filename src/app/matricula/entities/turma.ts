import { FormaPagamento } from './../../crud-exemplo/entities/formaPagamento';
export class Turma {
  id: string;
  nome: string;
  valor: number;
  formasPagamento: FormaPagamento[] = [];
}

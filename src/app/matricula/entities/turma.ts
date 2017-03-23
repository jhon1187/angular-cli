import {FormaPagamento} from './forma-pagamento';

export class Turma {
  id: number;
  nome: string;
  valor: number;
  formasPagamento: FormaPagamento[] = [];
}

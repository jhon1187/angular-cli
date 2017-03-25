import { FormaPagamento } from './../components/entities/forma-pagamento';
export class Turma {
  id: string;
  nome: string;
  valor: number;
  formasPagamento: FormaPagamento[] = [];
}

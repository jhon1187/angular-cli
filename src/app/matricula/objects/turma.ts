import { FormaPagamento } from './../components/objects/forma-pagamento';
export class Turma {
  id: string;
  nome: string;
  valor: number;
  formasPagamento: FormaPagamento[] = [];
}

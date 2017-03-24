import { Cartao } from './cartao';
import { Parcela } from './parcela';

export class FormaPagamentoForm {
  tipoPagamento: string;
  cartao: Cartao = new Cartao();
  parcela: Parcela = new Parcela();
}

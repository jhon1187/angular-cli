import { TipoFormaPagamento } from 'app/matricula/components/objects/tipo-forma-pagamento';
import { Cartao } from './cartao';
import { Parcela } from './parcela';

export class FormaPagamentoForm {
  tipoPagamento: TipoFormaPagamento;
  cartao: Cartao = new Cartao();
  parcela: Parcela = new Parcela();
}

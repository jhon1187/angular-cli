import { Parcela } from './entities/parcela';
import { Component, Input, Output } from '@angular/core';
import { FormaPagamento } from './entities/forma-pagamento';
import { FormaPagamentoForm } from './entities/forma-pagemento-form';
import { Cartao } from './entities/cartao';

@Component({
  selector: 'forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent {

  @Input("model") model: FormaPagamentoForm;
  @Input("formasPagamento") formasPagamento: FormaPagamento[];
  @Input("valorTotal") valorTotal: number;

  parcelas: Parcela[] = [];

  constructor() { }

  formaPagamentoAlterado() {
    this.model.parcela = new Parcela();
    this.model.cartao = new Cartao();

    this.parcelas = [];

    let formaPagamento = this.formasPagamento.find(formaPagamento => {
      return (formaPagamento.tipo == this.model.tipoPagamento);
    });

    for (var index = 0; index < formaPagamento.parcelas; index++) {
      let parcela = index + 1;
      let valor = this.valorTotal / parcela;

      this.parcelas[index] = new Parcela(parcela, valor);
    }

  }
}

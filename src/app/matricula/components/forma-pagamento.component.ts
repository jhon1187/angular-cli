import { Component, Input } from '@angular/core';
import { FormaPagamento } from '../entities/formaPagamento';

@Component({
  selector: 'forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent {

  @Input("formasPagamento") formasPagamento: FormaPagamento[] = [];
  @Input("valorTotal") valorTotal: number = null;

  tipoPagamentoSelecionado: string = null;

  parcelas: string [] = [];

  constructor() { }

  formaPagamentoAlterado() {
      let formaPagamento = this.formasPagamento.find(formaPagamento => {
        return (formaPagamento.tipo == this.tipoPagamentoSelecionado);
      });

      this.parcelas = new Array(formaPagamento.parcelas);

      for (var index = 1; index < formaPagamento.parcelas + 1; index++) {
        this.parcelas[index-1] = index + "x " + (this.valorTotal / index);
      }

  }
}

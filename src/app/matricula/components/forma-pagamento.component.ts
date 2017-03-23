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
  parcelas: any[] = [];
  parcelaSelecionada: number = null;
  cartao: any = {};

  constructor() { }

  formaPagamentoAlterado() {
    this.parcelas = [];
    this.parcelaSelecionada = null;

    let formaPagamento = this.formasPagamento.find(formaPagamento => {
      return (formaPagamento.tipo == this.tipoPagamentoSelecionado);
    });

    for (var index = 0; index < formaPagamento.parcelas; index++) {
      let parcelaAtual = index + 1;
      let valorParcelado = this.valorTotal / parcelaAtual;

      this.parcelas[index] = { "parcelaAtual": parcelaAtual, "valorParcelado": valorParcelado };
    }

  }
}

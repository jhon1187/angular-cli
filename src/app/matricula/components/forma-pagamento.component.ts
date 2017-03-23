import { Component, Input, Output } from '@angular/core';
import { FormaPagamento } from '../entities/formaPagamento';
import { Cartao } from './entities/cartao';
import { Parcela } from './entities/parcela';

@Component({
  selector: 'forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent {

  @Input("formasPagamento") formasPagamento: FormaPagamento[] = [];
  @Input("valorTotal") valorTotal: number = null;

  tipoPagamentoSelecionado: string = null;
  parcelas: Parcela[] = [];

  parcelaSelecionada: number = null;
  cartao: Cartao = new Cartao();

  constructor() { }

  formaPagamentoAlterado() {
    this.parcelas = [];
    this.parcelaSelecionada = null;
    this.cartao = new Cartao();

    let formaPagamento = this.formasPagamento.find(formaPagamento => {
      return (formaPagamento.tipo == this.tipoPagamentoSelecionado);
    });

    for (var index = 0; index < formaPagamento.parcelas; index++) {
      let parcelaAtual = index + 1;
      let valorParcelado = this.valorTotal / parcelaAtual;

      this.parcelas[index] = new Parcela(parcelaAtual, valorParcelado);
    }

  }
}

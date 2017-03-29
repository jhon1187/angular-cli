import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TipoFormaPagamento } from 'app/matricula/components/objects/tipo-forma-pagamento';
import { Parcela } from './objects/parcela';
import { FormaPagamento } from './objects/forma-pagamento';
import { FormaPagamentoForm } from './objects/forma-pagemento-form';
import { Cartao } from './objects/cartao';

@Component({
  selector: 'forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent {

  @Input("model") model: FormaPagamentoForm;
  @Input("formasPagamento") formasPagamento: FormaPagamento[];
  @Input("valorTotal") valorTotal: number;

  @Output("formGroupUpdated") formGroupUpdated = new EventEmitter();

  formGroup: FormGroup;

  parcelas: Parcela[] = [];

  TipoFormaPagamento: typeof TipoFormaPagamento = TipoFormaPagamento;

  constructor(
    formBuilder: FormBuilder,
  ) {
    this.formGroup = formBuilder.group({
      formaPagamento: ['', Validators.required],
      nomeCartao: [],
      numeroCartao: ['', Validators.required],
      codigoCartao: ['', Validators.required],
      validadeCartao: ['', Validators.required],
      parcela: ['', Validators.required],
    });

    this.formGroupUpdated.emit(this.formGroup);
  }

  formaPagamentoAlterado() {

    if (!this.model.tipoPagamento) {
      return;
    }

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

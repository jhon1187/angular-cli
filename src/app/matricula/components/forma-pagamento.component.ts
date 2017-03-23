import { Component, Input } from '@angular/core';
import { FormaPagamento } from '../entities/formaPagamento';

@Component({
  selector: 'forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent {

  @Input("formasPagamento") formasPagamento: FormaPagamento[] = [];

  constructor() { }

}

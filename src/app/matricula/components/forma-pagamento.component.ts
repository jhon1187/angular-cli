import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormaPagamento } from '../entities/formaPagamento';

import { CurrencyPipe } from "../../shared/components/currency.pipe";

@Component({
  selector: 'forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {

  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe
  ) {
    this.form = formBuilder.group({
      turma: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      aluno: ['', [
        Validators.required
      ]],
      valorTotal: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
     

    });
  }

}

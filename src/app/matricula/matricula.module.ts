import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';
import { MaterializeDirective } from 'angular2-materialize';

import { MatriculaService } from './matricula.service';
import { MatriculaFormComponent } from './pages/matricula-form.component';
import { FormaPagamentoComponent } from './components/forma-pagamento.component';

import { CurrencyPipe } from "../shared/components/currency.pipe";
import { CurrencyFormatterDirective } from "../shared/components/currency-formatter.directive";

@NgModule({
  declarations: [
    MatriculaFormComponent,
    FormaPagamentoComponent,
    CurrencyFormatterDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    MaterializeModule
  ],
  exports: [
    MaterializeDirective
  ],
  providers: [
    MatriculaService,
    CurrencyPipe
  ]
})
export class MatriculaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MaterializeModule, MaterializeDirective } from 'angular2-materialize';

import { MatriculaService } from './matricula.service';
import { MatriculaFormComponent } from './pages/matricula-form.component';
import { FormaPagamentoComponent } from './components/forma-pagamento.component';

import { TranslateDirective } from "../shared/components/translate.directive";
import { NumberFormatterDirective } from "app/shared/components/number-formatter.directive";
import { NumberCustomPipe } from "app/shared/components/number-custom.pipe";
import { CardNumberFormatterDirective } from "app/shared/components/card-number-formatter.directive";
import { CardNumberCustomPipe } from "app/shared/components/card-number-custom.pipe";

@NgModule({
  declarations: [
    MatriculaFormComponent,
    FormaPagamentoComponent,
    TranslateDirective,
    NumberFormatterDirective,
    NumberCustomPipe,
    CardNumberFormatterDirective,
    CardNumberCustomPipe
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
    MaterializeDirective,
    TranslateDirective
  ],
  providers: [
    MatriculaService,
    NumberCustomPipe,
    CardNumberCustomPipe
  ]
})
export class MatriculaModule { }

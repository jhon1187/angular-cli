import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MatriculaComponent } from './matricula.component';
import { MatriculaService } from './matricula.service';
import { MatriculaFormComponent } from './forms/matricula-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    MatriculaComponent,
    MatriculaFormComponent
  ],
  exports: [
    MatriculaComponent
  ],
  providers: [
    MatriculaService
  ]
})
export class MatriculaModule { }

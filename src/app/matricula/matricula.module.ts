import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MatriculaService } from './matricula.service';
import { MatriculaFormComponent } from './pages/matricula-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    MatriculaFormComponent
  ],
  exports: [
    MatriculaFormComponent
  ],
  providers: [
    MatriculaService
  ]
})
export class MatriculaModule { }

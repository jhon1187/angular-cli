import { Routes, RouterModule } from '@angular/router';

import { MatriculaComponent } from './matricula.component';
import { MatriculaFormComponent } from "./forms/matricula-form.component";

const matriculaRoutes: Routes = [
  { path: 'matricula', component: MatriculaComponent, pathMatch: 'full' },
  { path: 'matricula/form', component: MatriculaFormComponent },
  { path: 'matricula/form/:id', component: MatriculaFormComponent }
];

export const matriculaRouting = RouterModule.forChild(matriculaRoutes);

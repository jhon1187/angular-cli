import { Routes, RouterModule } from '@angular/router';

import { MatriculaFormComponent } from "./pages/matricula-form.component";

const matriculaRoutes: Routes = [
  { path: 'matricula/form', component: MatriculaFormComponent, pathMatch: 'full' }
];

export const matriculaRouting = RouterModule.forChild(matriculaRoutes);

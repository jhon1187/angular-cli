import { Routes, RouterModule } from '@angular/router';

import { MatriculaFormComponent } from "./pages/matricula-form.component";

const matriculaRoutes: Routes = [
  { path: 'matricula/form', component: MatriculaFormComponent }
];

export const matriculaRouting = RouterModule.forChild(matriculaRoutes);

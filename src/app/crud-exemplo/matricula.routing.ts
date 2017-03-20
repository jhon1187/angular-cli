import { Routes, RouterModule } from '@angular/router';

import { MatriculaComponent } from './pages/matricula.component';
import { MatriculaFormComponent } from "./pages/matricula-form.component";

const matriculaRoutes: Routes = [
  // { path: 'matricula', component: MatriculaComponent, pathMatch: 'full' },
  // { path: 'matricula/form', component: MatriculaFormComponent },
  // { path: 'matricula/form/:id', component: MatriculaFormComponent }
];

export const matriculaRouting = RouterModule.forChild(matriculaRoutes);

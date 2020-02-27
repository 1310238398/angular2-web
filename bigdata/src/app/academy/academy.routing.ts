import { AcademyComponent } from './academy.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AcademyComponent
   },
];

export const AcademyRoutes = RouterModule.forChild(routes);

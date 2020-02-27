import {Routes, RouterModule} from '@angular/router';
import {AcademyComponent} from './academy.component';

const routes: Routes = [
  {
    path: '',
    component: AcademyComponent
  }
];

export const AcademyRoutes = RouterModule.forChild(routes);

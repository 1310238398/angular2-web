import { Routes, RouterModule } from '@angular/router';
import { FdyComponent } from './fdy.component';
import { NotWriteComponent } from './notwrite/notwrite.component';

const routes: Routes = [
  { path: '', component: FdyComponent },
  { path: 'notwrite', component: NotWriteComponent }
];

export const FdyRouteRoutes = RouterModule.forChild(routes);

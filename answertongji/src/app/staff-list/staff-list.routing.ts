import { StaffListComponent } from './staff-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: StaffListComponent },
];

export const StaffListRoutes = RouterModule.forChild(routes);

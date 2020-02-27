import { Routes, RouterModule } from '@angular/router';
import {StaffComponent} from "./staff.component";

const routes: Routes = [
  { path: '', component: StaffComponent },
];

export const StaffRouteRoutes = RouterModule.forChild(routes);

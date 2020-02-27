import { Routes, RouterModule } from '@angular/router';
import {AttachComponent} from "./attach.component";

const routes: Routes = [
  { path: '', component: AttachComponent }
];

export const AttachRouteRoutes = RouterModule.forChild(routes);

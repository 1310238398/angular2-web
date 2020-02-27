import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';
import { StudentComponent } from './student/student.component';
import { LeaveapplyComponent } from './leaveapply/leaveapply.component';
import {XiaojiaComponent} from "./xiaojia/xiaojia.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'xiaojia',
    component: XiaojiaComponent
  },
  {
    path: 'leaveapply',
    component: LeaveapplyComponent
  }
];

export const IndexRoutes = RouterModule.forChild(routes);

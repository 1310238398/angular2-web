import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QwardIndexComponent } from './awardindex/awardindex.component';
import { AwardProjectComponent } from './awardproject/awardproject.component';
import { AwardWithoutComponent } from './awardwithout/awardwithout.component';
import { AwardAcademyComponent } from './awardacademy/awardacademy.component';
import { AwardDetailComponent } from './awarddetail/awarddetail.component';
import { AwardPoolComponent } from './awardpool/awardpool.component';


const routes: Routes = [
  {
    path: '',
    component: QwardIndexComponent
  }, {
    path: 'awardproject',
    component: AwardProjectComponent
  }, {
    path: 'awardwithout',
    component: AwardWithoutComponent
  }, {
    path: 'awardacademy',
    component: AwardAcademyComponent
  }, {
    path: 'awarddetail',
    component: AwardDetailComponent
  }, {
    path: 'awardpool',
    component: AwardPoolComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardInfoRoutingModule {
}


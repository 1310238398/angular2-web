import { NgModule } from '@angular/core';
import { ModalHelper } from 'src/app/share/modalHelper';
import { SharedModule } from '../shared/shared.module';
import { AwardInfoRoutingModule } from "./awardinfo-routing.module";
import { QwardIndexComponent } from './awardindex/awardindex.component';
import { AwardProjectComponent } from './awardproject/awardproject.component';
import { AwardPoolComponent } from './awardpool/awardpool.component';
import { AwardWithoutComponent } from './awardwithout/awardwithout.component';
import { AwardAcademyComponent } from './awardacademy/awardacademy.component';
import { AwardDetailComponent } from './awarddetail/awarddetail.component';



@NgModule({
  imports: [
    SharedModule,
    AwardInfoRoutingModule
  ],
  declarations: [
    QwardIndexComponent,
    AwardProjectComponent,
    AwardWithoutComponent,
    AwardAcademyComponent,
    AwardDetailComponent,
    AwardPoolComponent
  ],
  entryComponents: [],
  providers: [ModalHelper],
})
export class AwardInfoModule {
}

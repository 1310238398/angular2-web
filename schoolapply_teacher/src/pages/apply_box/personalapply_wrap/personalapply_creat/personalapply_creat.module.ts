import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalApplyCreatPage } from './personalapply_creat';


@NgModule({
  declarations: [
    PersonalApplyCreatPage
  ],
  imports: [
    IonicPageModule.forChild(PersonalApplyCreatPage),
  ],
  entryComponents: [
    PersonalApplyCreatPage
  ],
})
export class PersonalApplyCreatPageModule {}

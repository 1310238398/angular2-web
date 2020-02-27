import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveIndexPage } from "./leaveindex";
import { HelpUtils } from '../../app/utils/HelpUtils';

@NgModule({
  declarations: [
    LeaveIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveIndexPage),
  ],
  entryComponents: [
    LeaveIndexPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[HelpUtils]

})
export class LeaveIndexPageModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayIndexPage } from "./displayindex";
import { HelpUtils } from '../../app/utils/HelpUtils';

@NgModule({
  declarations: [
    DisplayIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayIndexPage),
  ],
  entryComponents: [
    DisplayIndexPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[HelpUtils]

})
export class DisplayIndexPageModule { }

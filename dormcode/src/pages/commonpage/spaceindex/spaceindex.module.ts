import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpaceIndexPage } from "./spaceindex";
import { HelpUtils } from '../../../app/utils/HelpUtils';

@NgModule({
  declarations: [
    SpaceIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(SpaceIndexPage),
  ],
  entryComponents: [
    SpaceIndexPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[HelpUtils]

})
export class SpaceIndexPageModule { }

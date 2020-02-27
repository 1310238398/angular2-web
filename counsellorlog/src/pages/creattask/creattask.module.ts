import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatTaskPage } from "./creattask";


@NgModule({
  declarations: [
    CreatTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatTaskPage),
  ],
  entryComponents: [
    CreatTaskPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class CreatTaskPageModule { }

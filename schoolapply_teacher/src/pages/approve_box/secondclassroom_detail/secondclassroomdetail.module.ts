import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecondClassRoomDetailPage } from "./secondclassroomdetail";




@NgModule({
  declarations: [
    SecondClassRoomDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SecondClassRoomDetailPage),
  ],
  entryComponents: [
    SecondClassRoomDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class SecondClassRoomDetailPageModule { }

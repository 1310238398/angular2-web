import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomDetailPage } from "./roomdetail";
import { HelpUtils } from '../../app/utils/HelpUtils';


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    RoomDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomDetailPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    RoomDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[HelpUtils]

})
export class RoomDetailPageModule { }

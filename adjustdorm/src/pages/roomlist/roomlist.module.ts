import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomListPage } from "./roomlist";
import { HelpUtils } from '../../app/utils/HelpUtils';


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    RoomListPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomListPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    RoomListPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[HelpUtils]

})
export class RoomListPageModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeStatusDetailPage } from "./changeStatus_detail";




@NgModule({
  declarations: [
    ChangeStatusDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeStatusDetailPage),
  ],
  entryComponents: [
    ChangeStatusDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class ChangeStatusDetailPageModule { }

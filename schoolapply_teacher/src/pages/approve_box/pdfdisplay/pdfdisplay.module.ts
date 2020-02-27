import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfDisplayPage } from "./pdfdisplay";

@NgModule({
  declarations: [
    PdfDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(PdfDisplayPage),
  ],
  entryComponents: [
    PdfDisplayPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class PdfDisplayPageModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexPage } from "./index";
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    IndexPage,
  ],
  imports: [
    QuillModule,
    IonicPageModule.forChild(IndexPage),
  ],
  exports: [
    IndexPage
  ]
})
export class IndexPageModule { }

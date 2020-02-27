import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogDetailPage } from './logdetail';
import {NgxTinymceModule} from "ngx-tinymce";

const COMPOMENTS = [LogDetailPage];

@NgModule({
  declarations: [
    LogDetailPage
  ],
  imports: [
    NgxTinymceModule.forRoot({
      baseURL: 'assets/lib/tinymce/'
    }),
    IonicPageModule.forChild(LogDetailPage),
  ],
  entryComponents: [
    COMPOMENTS
  ],
})
export class LogDetailPageModule {}

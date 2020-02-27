import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ClipboardModule} from 'ngx-clipboard';
import { UploadingTwoPage } from './uploadingtwo';


@NgModule({
  declarations: [
    UploadingTwoPage
  ],
  imports: [
    ClipboardModule,
    IonicPageModule.forChild(UploadingTwoPage),
  ],
  entryComponents: [
    UploadingTwoPage
  ],
})
export class UploadingTwoPageModule {}

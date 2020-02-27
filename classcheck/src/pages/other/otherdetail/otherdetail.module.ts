import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ClipboardModule} from 'ngx-clipboard';
import { OtherDetailPage } from './otherdetail';


@NgModule({
  declarations: [
    OtherDetailPage
  ],
  imports: [
    ClipboardModule,
    IonicPageModule.forChild(OtherDetailPage),
  ],
  entryComponents: [
    OtherDetailPage
  ],
})
export class OtherDetailPageModule {}

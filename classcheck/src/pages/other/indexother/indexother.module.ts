import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ClipboardModule} from 'ngx-clipboard';
import { IndexOtherPage } from './indexother';


@NgModule({
  declarations: [
    IndexOtherPage
  ],
  imports: [
    ClipboardModule,
    IonicPageModule.forChild(IndexOtherPage),
  ],
  entryComponents: [
    IndexOtherPage
  ],
})
export class IndexOtherPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ClipboardModule} from 'ngx-clipboard';
import { NameListPage } from './namelist';


@NgModule({
  declarations: [
    NameListPage
  ],
  imports: [
    ClipboardModule,
    IonicPageModule.forChild(NameListPage),
  ],
  entryComponents: [
    NameListPage
  ],
})
export class NameListPageModule {}

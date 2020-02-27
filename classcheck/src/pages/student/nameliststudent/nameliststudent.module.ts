import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ClipboardModule} from 'ngx-clipboard';
import { NameListStudentPage } from './nameliststudent';


@NgModule({
  declarations: [
    NameListStudentPage
  ],
  imports: [
    ClipboardModule,
    IonicPageModule.forChild(NameListStudentPage),
  ],
  entryComponents: [
    NameListStudentPage
  ],
})
export class NameListStudentPageModule {}

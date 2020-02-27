import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakPage } from './speak';



@NgModule({
  declarations: [
    SpeakPage
  ],
  imports: [
    IonicPageModule.forChild(SpeakPage),
  ],
  entryComponents: [
    SpeakPage
  ],
})
export class SpeakPageModule { }

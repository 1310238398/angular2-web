import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromiseBookTwoPage } from './promisebooktwo';
import { SignaturePadModule } from 'angular2-signaturepad';


@NgModule({
  declarations: [
    PromiseBookTwoPage
  ],
  imports: [
    SignaturePadModule,
    IonicPageModule.forChild(PromiseBookTwoPage),
  ],
  entryComponents: [
    PromiseBookTwoPage
  ],
})
export class PromiseBookTwoModule {}

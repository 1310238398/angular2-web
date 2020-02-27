import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromiseBookPage } from './promisebook';
import { SignaturePadModule } from 'angular2-signaturepad';


@NgModule({
  declarations: [
    PromiseBookPage
  ],
  imports: [
    SignaturePadModule,
    IonicPageModule.forChild(PromiseBookPage),
  ],
  entryComponents: [
    PromiseBookPage
  ],
})
export class PromiseBookPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromiseBookOnePage } from './promisebookone';


@NgModule({
  declarations: [
    PromiseBookOnePage
  ],
  imports: [
    IonicPageModule.forChild(PromiseBookOnePage),
  ],
  entryComponents: [
    PromiseBookOnePage
  ],
})
export class PromiseBookOneModule {}

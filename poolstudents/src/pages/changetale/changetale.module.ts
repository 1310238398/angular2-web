import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeTalePage } from './changetale';


@NgModule({
  declarations: [
    ChangeTalePage
  ],
  imports: [
    IonicPageModule.forChild(ChangeTalePage),
  ],
  entryComponents: [
    ChangeTalePage
  ],
})
export class ChangeTalePageModule {}

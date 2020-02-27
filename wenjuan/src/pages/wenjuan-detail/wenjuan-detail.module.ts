import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WenjuanDetailPage } from './wenjuan-detail';

@NgModule({
  declarations: [
    WenjuanDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WenjuanDetailPage),
  ],
})
export class WenjuanDetailPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewDetailPage } from './previewdetail';

@NgModule({
  declarations: [
    PreviewDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewDetailPage),
  ],
})
export class PreviewDetailPageModule {}

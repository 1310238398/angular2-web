import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewPhotoPage } from './previewphoto';

@NgModule({
  declarations: [
    PreviewPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewPhotoPage),
  ],
})
export class PreviewPhotoPageModule {}

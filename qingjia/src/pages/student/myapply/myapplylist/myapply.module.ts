import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MyapplyPage} from './myapply';
import {CommonService} from "../../../../app/service/CommonService";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    MyapplyPage
  ],
  imports: [
    IonicPageModule.forChild(MyapplyPage),
    PipesModule,
  ],
  providers: [CommonService]
})
export class MyapplyPageModule {
}

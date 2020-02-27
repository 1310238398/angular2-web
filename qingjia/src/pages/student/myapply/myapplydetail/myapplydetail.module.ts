import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyapplydetailPage } from './myapplydetail';
import {CommonService} from "../../../../app/service/CommonService";
import {ApplydetailComponentsModule} from "../../../../components/apply-leave-detail/applydetail.components.module";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    MyapplydetailPage,
  ],
  imports: [
    ApplydetailComponentsModule,
    PipesModule,
    IonicPageModule.forChild(MyapplydetailPage),
  ],
  providers:[CommonService],
})
export class MyapplydetailPageModule {}

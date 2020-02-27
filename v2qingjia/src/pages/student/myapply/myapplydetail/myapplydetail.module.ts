import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyapplydetailPage } from './myapplydetail';
import {CommonService} from "../../../../app/service/CommonService";
import {ApplydetailComponentsModule} from "../../../../components/apply-leave-detail/applydetail.components.module";
import {PipesModule} from "../../../../pipes/stringtodate/pipes.module";
import {StepsModule} from "../../../../components/steps/steps.module";

@NgModule({
  declarations: [
    MyapplydetailPage,
  ],
  imports: [
    ApplydetailComponentsModule,
    PipesModule,
    StepsModule,
    IonicPageModule.forChild(MyapplydetailPage),
  ],
  providers:[CommonService],
})
export class MyapplydetailPageModule {}

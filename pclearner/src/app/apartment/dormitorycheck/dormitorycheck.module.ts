import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from "../../service/common.service";
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from "@angular/router";
import { NzTreeModule } from 'ng-tree-antd';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { DormitorycheckComponent } from './dormitorycheck.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { PreviewcheckComponent } from './previewcheck/previewcheck.component';
import { ResultComponent } from './result/result.component';
import { ProgressComponent } from './progress/progress.component';
import { PeopleComponent } from './progress/people.component';
import { DormComponent } from './progress/dorm.component';
import { ResultDetailComponent } from "./result/resultdetails.component";

import { AssignDormitoryComponent } from './assigndormitory/assigndormitory.component'
// 路由
import { CheckRoutingModule } from './dormitorycheck.routing.module'
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};
@NgModule({
  imports: [
    SwiperModule,
    CheckRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    NzTreeModule,

  ],
  declarations: [
    DormitorycheckComponent,
    NewtaskComponent,
    PreviewcheckComponent,
    ResultComponent,
    ProgressComponent,
    PeopleComponent,
    DormComponent,
    AssignDormitoryComponent,
    ResultDetailComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class DormitorycheckModule { }

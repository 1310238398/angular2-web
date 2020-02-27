import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

// 路由
import { DormitoryDataRoutingRoutingModule } from './dormitory-routing.module';
// 组件
import { DormitorydataComponent } from './dormitorydata/dormitorydata.component';
import { DataDetailComponent } from './datadetail/datadetail.component';


@NgModule({
    imports: [
        DormitoryDataRoutingRoutingModule,
        CommonModule,
        FormsModule,
        SharedModule,

    ],
    declarations: [
        DormitorydataComponent,
        DataDetailComponent

    ],

    exports: [RouterModule],
    providers: [CommonService]
})
export class DormitoryDataModule { }
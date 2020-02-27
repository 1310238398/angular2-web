import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "../shared/shared.module";

import { HttpService } from "./http/http.service";
import { BaoXiuService } from "./baoxiu.service";
import { CheckMenuFieldService } from "../service/checkMenuField.service";
import { NgxEchartsModule } from 'ngx-echarts';

import { ListComponent } from './list';
import { DetailComponent } from './detail';
import { StatisticsComponent } from './statistics';

const COMPOMENTS = [ListComponent, DetailComponent, StatisticsComponent];
const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
    imports: [
        NgxEchartsModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],

    declarations: [...COMPOMENTS],
    providers: [HttpService, BaoXiuService, CheckMenuFieldService]
})
export class BaoXiuModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "../shared/shared.module";
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpService } from "../http/http.service";
import { RoomService } from "./room.service";

import { StatisComponent } from './statis';
import { RoomSearchComponent } from './room_search';
import { RoomInfoComponent } from './room_info';

const COMPOMENTS = [StatisComponent, RoomSearchComponent, RoomInfoComponent];
const routes: Routes = [
    { path: '', component: StatisComponent, data: { reuse: true } },
    { path: 'search', component: RoomSearchComponent },
    { path: 'info', component: RoomInfoComponent }
];

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        NgxEchartsModule,
        RouterModule.forChild(routes)
    ],

    declarations: [...COMPOMENTS],
    providers: [HttpService, RoomService]
})
export class RoomModule { }

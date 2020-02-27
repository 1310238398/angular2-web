import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxTinymceModule } from "ngx-tinymce";
import { SharedModule } from "../shared/shared.module";
import { DatascopeModule } from "../component/datascope/datascope.module";

import { HttpService } from "../../http/http.service";
import { ActivityService } from "./activity.service";
import { CheckMenuFieldService } from "../service/checkMenuField.service";

import { ActivityListComponent } from './list';
import { ActivityAddComponent } from './add';
import { ActivityAuditComponent } from './audit';

const COMPOMENTS = [ActivityListComponent, ActivityAddComponent, ActivityAuditComponent];
const routes: Routes = [
    { path: '', component: ActivityListComponent },
    { path: 'add', component: ActivityAddComponent },
    { path: 'audit', component: ActivityAuditComponent }
];

@NgModule({
    imports: [
        HttpClientModule,
        NgxTinymceModule.forRoot({
            baseURL: 'assets/lib/tinymce/'
        }),
        SharedModule,
        DatascopeModule,
        RouterModule.forChild(routes)
    ],

    declarations: [...COMPOMENTS],
    providers: [HttpService, ActivityService, CheckMenuFieldService]
})
export class ActivityModule { }

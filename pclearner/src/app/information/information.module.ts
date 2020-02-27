import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxTinymceModule } from "ngx-tinymce";

import { InfoListComponent } from './list';
import { InfoAddComponent } from './add';
import { InfoStatisComponent } from './statis';
import { SharedModule } from "../shared/shared.module";
import { CommonService } from "../service/common.service";
import { HttpService } from "../../http/http.service";
import { InformationService } from "./information.service";
import { CheckMenuFieldService } from "../service/checkMenuField.service";
import { DatascopeModule } from "../component/datascope/datascope.module";
const COMPOMENTS = [InfoListComponent, InfoAddComponent, InfoStatisComponent];
const routes: Routes = [
    { path: '', component: InfoListComponent },
    { path: 'add', component: InfoAddComponent },
    { path: 'statis', component: InfoStatisComponent }
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
    providers: [CommonService, HttpService, InformationService, CheckMenuFieldService]
})
export class InforMationModule { }

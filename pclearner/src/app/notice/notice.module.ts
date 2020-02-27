import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxTinymceModule } from "ngx-tinymce";
import { SharedModule } from "../shared/shared.module";
import { DatascopeModule } from "../component/datascope/datascope.module";

import { HttpService } from "../../http/http.service";
import { NoticeService } from "./notice.service";
import { CheckMenuFieldService } from "../service/checkMenuField.service";

import { NoticeListComponent } from './list';
import { NoticeAddComponent } from './add';
// import { InfoStatisComponent } from './statis';

const COMPOMENTS = [NoticeListComponent, NoticeAddComponent];
const routes: Routes = [
    { path: '', component: NoticeListComponent },
    { path: 'add', component: NoticeAddComponent },
    // { path: 'statis', component: InfoStatisComponent }
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
    providers: [HttpService, NoticeService, CheckMenuFieldService]
})
export class NoticeModule { }

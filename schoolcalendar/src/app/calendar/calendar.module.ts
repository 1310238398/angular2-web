import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { HttpService } from '../http.service';
import { CalendarService } from './calendar.service';

import { ListComponent } from './list';
const components = [ListComponent];
const routes: Routes = [
    { path: '', component: ListComponent }
];


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        NgZorroAntdModule
    ],
    declarations: [...components
    ],
    entryComponents: [...components],
    providers: [HttpService, CalendarService]
})
export class CalendarModule {
}
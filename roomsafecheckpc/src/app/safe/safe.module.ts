import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { HttpService } from '../http.service';
import { SafeService } from './safe.service';

import { ListComponent } from './list';
const components = [ListComponent];
const routes: Routes = [
    { path: '', component: ListComponent }
];


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        NgZorroAntdModule
    ],
    declarations: [...components
    ],
    entryComponents: [...components],
    providers: [HttpService, SafeService]
})
export class RoomSafeModule {
}

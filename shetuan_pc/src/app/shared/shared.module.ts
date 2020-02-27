import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";

import {ModalHelper} from "./helper/modal.helper";
import { MomentDatePipe,MomentDateStringPipe } from './pipe/date.pipe';

const PIPES = [MomentDatePipe,MomentDateStringPipe];
const HELPERS = [ ModalHelper ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    declarations: [ ...PIPES],
    providers: [ ...HELPERS ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        RouterModule,
        ...PIPES
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}

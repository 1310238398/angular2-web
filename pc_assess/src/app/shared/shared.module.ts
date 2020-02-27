import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SumPipe} from "../share/sum.pipe";
import {PingyiPipe} from "../share/pingyi.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  declarations: [SumPipe,PingyiPipe],
  providers: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule,
    RouterModule,
    SumPipe,
    PingyiPipe
  ]
})
export class SharedModule {
}

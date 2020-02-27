import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  declarations: [],
  providers: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule {
}

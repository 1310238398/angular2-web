import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  declarations: [],
  providers: [],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule
  ]
})
export class SharedModule {
}

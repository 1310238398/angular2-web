import { StudentChangeClassRoutingModule } from './studentchangeclass.routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {StudentChangeClassComponent} from "./studentchangeclass.component";
import {RouterModule} from "@angular/router";
import {NzTreeModule} from "ng-tree-antd";

@NgModule({
  imports: [
    StudentChangeClassRoutingModule,
    NzTreeModule,
    SharedModule
  ],
  declarations: [StudentChangeClassComponent],
  exports: [RouterModule],
})
export class StudentChangeClassModule { }

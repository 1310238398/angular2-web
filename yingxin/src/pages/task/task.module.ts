/**
 * Created by hanzhendong on 2017/6/22.
 */
import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {TaskPage} from "./task";
import {StringToDatePipe} from "../../app/pipe/stringtodate";
@NgModule({
  declarations: [TaskPage,StringToDatePipe],
  imports: [IonicPageModule.forChild(TaskPage),],
  exports: [TaskPage]
})
export class TaskModule {

}

/**
 * Created by hanzhendong on 2017/6/22.
 */
import {NgModule} from "@angular/core";
import {Index} from "./index";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[Index],
  imports: [IonicPageModule.forChild(Index),],
  exports:[Index]
})
export class IndexModule{

}

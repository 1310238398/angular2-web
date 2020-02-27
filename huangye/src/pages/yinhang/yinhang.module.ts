import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {YinhangPage} from "./yinhang";
/**
 * Created by hanzhendong on 2017/5/2.
 */
@NgModule({
  imports: [IonicPageModule.forChild(YinhangPage)],
  declarations: [YinhangPage],
  exports: [YinhangPage]
})
export class YinhangModule {

}

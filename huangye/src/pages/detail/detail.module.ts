import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {DetailPage} from "./detail";

/**
 * Created by hanzhendong on 2017/5/2.
 */
@NgModule({
  imports: [IonicPageModule.forChild(DetailPage)],
  declarations: [DetailPage],
  exports: [DetailPage]
})
export class DetailModule {

}

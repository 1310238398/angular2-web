import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {SearchPage} from "./search";

/**
 * Created by hanzhendong on 2017/5/2.
 */
@NgModule({
  imports: [IonicPageModule.forChild(SearchPage)],
  declarations: [SearchPage],
  exports: [SearchPage]
})
export class SearchModule {

}

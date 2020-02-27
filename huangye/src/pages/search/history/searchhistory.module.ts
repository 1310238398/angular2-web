import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {SearchHistory} from "./searchhistory";

/**
 * Created by hanzhendong on 2017/5/2.
 */
@NgModule({
  declarations: [SearchHistory],
  imports: [IonicPageModule.forChild(SearchHistory)],
  exports: [SearchHistory]
})
export class HistoryModule {

}

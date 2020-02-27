/**
 * Created by hanzhendong on 2017/6/22.
 */
import {NgModule} from "@angular/core";
import {OldBoy} from "./oldboy";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[OldBoy],
  imports: [IonicPageModule.forChild(OldBoy),],
  exports:[OldBoy]
})
export class OldBoyModule{

}

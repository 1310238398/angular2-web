import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {BumenPage} from "./bumen";

@NgModule({
  imports: [IonicPageModule.forChild(BumenPage)],
  declarations: [BumenPage],
  exports: [BumenPage]
})
export class BumenModule {

}

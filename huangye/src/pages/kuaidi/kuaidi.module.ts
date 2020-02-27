import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {KuaidiPage} from "./kuaidi";

/**
 * Created by hanzhendong on 2017/5/2.
 */
@NgModule({
  declarations: [KuaidiPage],
  imports: [IonicPageModule.forChild(KuaidiPage)],
  exports: [KuaidiPage]
})
export class KuaidiModule {

}

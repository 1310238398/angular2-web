import {NgModule} from '@angular/core';
import {IonicPageModule} from "ionic-angular";
import {UserInfoComponent} from "./UserInfo";


@NgModule({
  declarations: [
    UserInfoComponent
  ],

  imports: [
    IonicPageModule.forChild(UserInfoComponent),
  ],

  exports: [
    UserInfoComponent
  ]
})
export class UserInfoComponentsModule {
}

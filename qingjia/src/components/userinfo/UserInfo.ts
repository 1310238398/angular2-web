import { HttpService } from '../../http/http.Service';
/**
 * Created by hanzhendong on 2017/12/28.
 */
declare var antlinker;
import { Component, Input } from "@angular/core";
import {ServelUrl} from "../../app/ServelUrl";
@Component({
    selector: 'stu-usernfo',
    template: `<ion-card style="height: 100px">
        <ion-card-content>
            <img class="apply-picture" (error)="onImageLoadError($event)" [src]='Url||""'>
            <div class="apply-info">
                <h2>{{User.Name}}</h2>
                <p>{{User.ClassName}}</p>
                <p>{{User.UserCode}}</p>
                <!-- <span class="last-message-timestamp"><ion-icon ios="ios-call" md="md-call" style="color: #d03e84"></ion-icon></span>-->
            </div>
          <div><ion-icon item-right name="ios-call" class="circle" (click)="callPhone(item);"></ion-icon></div>
        </ion-card-content>
    </ion-card>`
})
export class UserInfoComponent {
    selr_UserInfo;
    Url;

    @Input('UserInfo')
    set User(UserInfo) {
        this.http.postJSON({
            Router: ServelUrl.Url.UserIcon,
            Method: 'POST',
            Body: {
                IntelUserCode: UserInfo.IntelUserCode
            }
        }).then(
            data => {
                this.Url = data.Data.URL;
            });
        this.selr_UserInfo = UserInfo;
    }

    get User() {
        return this.selr_UserInfo;
    }

    constructor(private http: HttpService) {
    }

    onImageLoadError(event) {
        event.target.src='assets/images/user.png'
    }
  callPhone(){
    if(this.selr_UserInfo.Phone){
      antlinker.onTel(
        {
          tel: this.selr_UserInfo.Phone,
          text: this.selr_UserInfo.Name,
          success: function () {

          }
        }
      );
    }

  }
}

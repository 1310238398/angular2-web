import {LotteryPage} from './../lottery/LotteryPage';
import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {Validators, FormBuilder} from "@angular/forms";
import {HttpService} from "../../http/http.Service";
import {ServelUrl} from "../../app/ServelUrl";
import {HelpUtils} from "../../app/utils/HelpUtils";
import {LotteryDetailPage} from "../lottery/detail/LotteryDetailPage";
/**
 * Created by developer on 2017/3/15.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'loginpage.html'
})
export class LoginPage {
  user = {
    UserCode: '',
    Phone: ''
  };
  ValidatorsForm;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private httpService: HttpService, private helpUtil: HelpUtils) {
    this.ValidatorsForm = this.formBuilder.group({
      UserCode: ['', [Validators.required]],
      Phone: ['', Validators.required],
    });
  }

  onLogin() {
    this.httpService.postJSON(ServelUrl.Url.login, this.user).then(data => {
      if (!data.FeedbackCode) {
        if (data.Data==1||data.Data==2) {
          this.navCtrl.push(LotteryDetailPage,{Status:data.Data});
        } else {
          this.navCtrl.push(LotteryPage);
        }
      } else {
        this.helpUtil.toastPop(data.FeedbackText)
      }
    })
  }
}

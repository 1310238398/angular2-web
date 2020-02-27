import { IonicPage,NavController, ViewController } from "ionic-angular";
import { Component } from "@angular/core";
import { AppService } from "../../app/app.service";
import { Geography } from "../../app/geography";

@IonicPage()
@Component({
  selector: 'page-province',
  templateUrl: 'province.html'
})
export class ProvincePage {

  items: any;

  constructor(private appService: AppService, public navCtrl: NavController, public viewCtrl: ViewController, ) {
    appService.getProviceOfChina().then(
      comments => {
        if (!comments.FeedbackCode) {
          this.items = comments.Data || [];
        }
      });

    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () {},
      success: function () {},
    });
  }

  NavigationTo(item) {
    let geography: Geography = new Geography();
    geography.GeographyCode = item.GeographyCode;
    geography.GeographyName = item.GeographyName;
    this.appService.setCurrentProvince(item);
    this.navCtrl.push('CityPage');
  }
}

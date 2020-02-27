import { IonicPage, NavController, ViewController, NavParams } from "ionic-angular";
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
  Type;
  constructor(public navParams: NavParams, private appService: AppService, public navCtrl: NavController, public viewCtrl: ViewController, ) {
    this.Type = this.navParams.get('Type');

    if (this.Type == 'HouseholdCountry') {
      appService.getProviceOfHouse().then(
        comments => {
          if (!comments.FeedbackCode) {
            this.items = comments.Data || [];
          }
        });

    } else {
      appService.getProviceOfChina().then(
        comments => {
          if (!comments.FeedbackCode) {
            this.items = comments.Data || [];
          }
        });

    }

    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () { },
      success: function () { },
    });
  }

  NavigationTo(item) {
    let geography: Geography = new Geography();
    geography.GeographyCode = item.Code;
    geography.GeographyName = item.CodeName;
    this.appService.setCurrentProvince(geography);
    this.navCtrl.push('CityPage', {
      Type: this.Type,
    });
  }
}

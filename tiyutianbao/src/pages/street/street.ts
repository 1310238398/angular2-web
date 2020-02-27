import { IonicPage, NavController, ViewController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";
import { AppService } from "../../app/app.service";
import { Geography } from "../../app/geography";

@IonicPage()
@Component({
  selector: 'page-street',
  templateUrl: 'street.html'
})
export class StreetPage {

  items: any;
  Type;
  constructor(public navParams: NavParams, private appService: AppService, public navCtrl: NavController, public viewCtrl: ViewController, ) {
    this.Type = this.navParams.get('Type');

    appService.getStreetByHouseCounty(appService.getCurrentCounty().GeographyCode).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.items = comments.Data || [];
        }
      });

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
    if (item.CodeName == '无') {
      this.appService.setCurrentStreet(geography);
      this.navCtrl.setRoot(this.appService.getCurrentParentPage(), {
        Type: this.Type,
      });
      this.appService.send({
        OriginAreaCode: this.appService.getCurrentCounty().GeographyCode,
        OriginAreaCodeName: `${this.appService.getCurrentProvince().GeographyName}${this.appService.getCurrentCounty().GeographyName}
        ${this.appService.getCurrentCounty().GeographyName}`
      }
      )

    } else {
      this.appService.setCurrentStreet(geography);
      this.navCtrl.push('RegionPage', {
        Type: this.Type,
      });
    }

  }
}


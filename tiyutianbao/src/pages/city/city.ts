import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { AppService } from "../../app/app.service";
import { Geography } from "../../app/geography";


declare var antlinker;
@IonicPage()
@Component({
  selector: 'city',
  templateUrl: 'city.html',
})
export class CityPage {

  items: any;
  pcity;
  procode: any;
  Type;
  constructor(public navParams: NavParams, private appService: AppService, public navCtrl: NavController, public viewCtrl: ViewController, ) {
    this.Type = this.navParams.get('Type');
    if (this.Type == 'HouseholdCountry') {
      appService.getCityByHouseProvince(appService.getCurrentProvince().GeographyCode).then(
        comments => {
          if (!comments.FeedbackCode) {
            this.items = comments.Data || [];
          }
        });

    } else {

      appService.getCityByProvince(appService.getCurrentProvince().GeographyCode).then(
        comments => {
          if (!comments.FeedbackCode) {
            this.items = comments.Data || [];
          }
        });
    }
  }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });

  }

  NavigationTo(item) {
    let geography: Geography = new Geography();
    geography.GeographyCode = item.Code;
    geography.GeographyName = item.CodeName;
    this.appService.setCurrentCity(geography)
    this.navCtrl.push('CountyPage', {
      Type: this.Type,
    });
  }



}

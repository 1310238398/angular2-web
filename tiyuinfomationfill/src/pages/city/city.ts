import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
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

  constructor(private appService: AppService, public navCtrl: NavController, public viewCtrl: ViewController, ) {
    appService.getCityByProvince(appService.getCurrentProvince().GeographyCode).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.items = comments.Data || [];
        }
      });
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
    geography.GeographyCode = item.GeographyCode;
    geography.GeographyName = item.GeographyName;
    this.appService.setCurrentCity(geography)
    this.navCtrl.push('CountyPage');
  }



}

import { Component } from '@angular/core';
import { NavParams, IonicPage, NavController, ViewController, App } from 'ionic-angular';
import { AppService } from "../../app/app.service";
import { Geography } from "../../app/geography";

declare var antlinker;
@IonicPage()
@Component({
  selector: 'county',
  templateUrl: 'county.html',
})
export class CountyPage {

  items: any;
  pcity;
  citycode: any;
  Type;
  constructor(public navParams: NavParams, private appService: AppService, public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl: App) {
    this.Type = this.navParams.get('Type');
    if (this.Type == 'HouseholdCountry') {
      appService.getCountyByHouseCity(appService.getCurrentCity().GeographyCode).then(
        comments => {
          if (!comments.FeedbackCode) {
            this.items = comments.Data || [];
          }
        });

    } else {

      appService.getCountyByCity(appService.getCurrentCity().GeographyCode).then(
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
    this.appService.setCurrentCounty(geography);
    if (this.Type == 'HouseholdCountry') {
      this.navCtrl.push('StreetPage', {
        Type: this.Type,
      });
  
    } else {
      this.navCtrl.setRoot(this.appService.getCurrentParentPage(), {
        Type: this.Type,
      });
      this.appService.send({
        OriginAreaCode: this.appService.getCurrentCounty().GeographyCode,
        OriginAreaCodeName: `${this.appService.getCurrentProvince().GeographyName}${this.appService.getCurrentCounty().GeographyName}${this.appService.getCurrentCounty().GeographyName}`
      }
      )
    }
  }




}

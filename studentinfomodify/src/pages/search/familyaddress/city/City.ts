import {NavParams, NavController,ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {HttpService} from "../../../../http/http.Service";
import {ServelUrl} from "../../../../app/ServelUrl";
import {CountyPage} from "../county/County";
import {AppService} from "../../../../app/app.service";
import {Geography} from "../../../../app/geography";
import {FamilyAddressPage} from "../../familyaddress/FamilyAddress";


/**
 * Created by hanzhendong on 2017/7/8.
 */
@Component({
  selector: 'page-CityPage',
  templateUrl: 'City.html'
})
export class CityPage {
  items: any;
  pcity;
  procode:any;
 

  constructor(private params: NavParams, private appService: AppService, public navCtrl: NavController ,public viewCtrl: ViewController,) {
    // this.pcity = params.get('params');
    // this.pcity = params.data.params;
    //      this.procode = params.data.procode;
    
  appService.getCityByProvince(appService.getCurrentProvince().GeographyCode).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.items = comments.Data || [];
        }
      });
    antlinker.configTitle({
      type: "label",
      title: '家庭信息',
      fail: function () {

      },
      success: function () {
      }
    });
    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () {

      },
      success: function () {
      },

    });
  }

  NavigationTo(item) {
    // this.pcity.City = item;
    console.log(item.GeographyCode);
    let geography: Geography  = new Geography();
    geography.GeographyCode = item.GeographyCode;
    geography.GeographyName = item.GeographyName;
    this.appService.setCurrentCity(geography)
    this.navCtrl.push(CountyPage);
    // this.viewCtrl.dismiss();
    //  this.navCtrl.pop();

  }


  ionViewWillLeave() {

  
    // this.navCtrl.pop();
    //localStorage.setItem('InformationFilling', JSON.stringify(this.InformationFilling));
  }


}

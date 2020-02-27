import {App,NavParams, NavController,ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {HttpService} from "../../../../http/http.Service";
import {ServelUrl} from "../../../../app/ServelUrl";
import {FamilyAddressPage} from "../../familyaddress/FamilyAddress";
import {AppService} from "../../../../app/app.service";
import {Geography} from "../../../../app/geography";


/**
 * Created by hanzhendong on 2017/7/8.
 */
@Component({
  selector: 'page-County',
  templateUrl: 'County.html'
})
export class CountyPage {
  items: any;
  pcity;
  citycode:any;

  constructor(private params: NavParams, private appService: AppService, public navCtrl: NavController, public viewCtrl: ViewController,public appCtrl:App) {
    // this.pcity = params.get('params');
    // this.citycode = params.data.citycode;
    appService.getCountyByCity(appService.getCurrentCity().GeographyCode).then(
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
    // this.pcity.County = item;
    // console.log(this.pcity);
    let geography: Geography = new Geography();
    geography.GeographyCode = item.GeographyCode;
    geography.GeographyName = item.GeographyName;
    this.appService.setCurrentCounty(geography);
      this.navCtrl.setRoot(this.appService.getCurrentParentPage());
      this.appService.send({
          OriginAreaCode:this.appService.getCurrentCounty().GeographyCode,
          OriginAreaCodeName:`${this.appService.getCurrentProvince().GeographyName}${this.appService.getCurrentCounty().GeographyName}${this.appService.getCurrentCounty().GeographyName}`}
          )
   // this.navCtrl.setRoot(FamilyAddressPage);
    // this.navCtrl.setRoot(FamilyAddressPage);
    // this.viewCtrl.dismiss();
    //  this.navCtrl.pop();
  }


  ionViewWillLeave() {
  
    // this.appCtrl.getRootNav().push(FamilyAddressPage);
    //localStorage.setItem('InformationFilling', JSON.stringify(this.InformationFilling));
  }


}

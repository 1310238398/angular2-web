import {NavParams, NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {AppService} from "../../../../app/app.service";
import {Geography} from "../../../../app/geography";
import {ServelUrl} from "../../../../../../tianbao/src/app/ServelUrl";
import {CityPage} from "../city/City";
/**
 * Created by hanzhendong on 2017/7/8.
 */
@Component({
  selector: 'page-Province',
  templateUrl: 'province.html'
})
export class ProvincePage {
  InformationFilling: any;
  items: any;

  constructor(private appService: AppService,public navCtrl: NavController) {
   appService.getProviceOfChina().then(
      comments => {
        if (!comments.FeedbackCode) {
          this.items = comments.Data||[];
        }
      });
    //   this.http.postJSON({
    //         Router: ServelUrl.Url.querycitytype,
    //         Method: 'POST',
    //         Body: {GeographyCode:this.FamilyAddress.HomeProvinceCode||'',
    //              AreaType:'2'

    //         }
    //     }).then(
    //         comments => {
    //             if (!comments.FeedbackCode) {
    //                 this.Provience = comments.Data;
    //             }
    //         });
    //         this.http.postJSON({
    //         Router: ServelUrl.Url.querycitytype,
    //         Method: 'POST',
    //         Body: {GeographyCode:this.FamilyAddress.HomeCityCode||'',
    //              AreaType:'3'

    //         }
    //     }).then(
    //         comments => {
    //             if (!comments.FeedbackCode) {
    //                 this.AddressT = comments.Data;
    //             }
    //         });
    /*、
     * 调用jssdk
     *
     * */
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

  NavigationTo(item){
console.log(item.GeographyCode);
    let geography: Geography = new Geography();
    geography.GeographyCode = item.GeographyCode;
    geography.GeographyName = item.GeographyName;
    this.appService.setCurrentProvince(item)
    this.navCtrl.push(CityPage);
      // this.navCtrl.pop();
  }


  ionViewWillLeave() {

  }


}

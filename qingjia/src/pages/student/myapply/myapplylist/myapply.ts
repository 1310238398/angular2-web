import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {HttpService} from "../../../../http/http.Service";
import {ServelUrl} from "../../../../app/ServelUrl";

/**
 * Generated class for the MyapplyPage page.
 * Created by hanzhendong
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var antlinker;
@IonicPage()
@Component({
  selector: 'page-myapply',
  templateUrl: 'myapply.html',
})
export class MyapplyPage {
  searchQuery = '';
  items: Array<any> = [];
  Page: number = 0;
  moreData: boolean = true;
  PageNo: number = 10;
  loading: any;

  constructor(public navCtrl: NavController,private http: HttpService) {
    this.initializeItems()
  }
  ionViewWillEnter(){
    antlinker.configTitle({
      type: "label",
      title: '我的请假',
      fail: ()=>{},
      success: ''
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "empty",
      success: '',
      fail: ()=>{}
    });
  }
  initializeItems(refresher?) {
    this.http.postJSON({
      Router: ServelUrl.Url.querystudentleaveapplication,
      Method: 'POST',
      Body: {
        Page: 0,
        PageNo: this.PageNo,
        ApproveStatus: '1,3,4,6',
      }
    }).then(
      comments => {
        this.items = comments.Data || [];
        if(refresher){
          refresher.complete();
        }
      });
  }

  /*
   * 跳转
   * */
  NavigationTo(item) {
    /*构造指令参数*/
/*    item.LeaveType = {
      Code: item.LeaveType,
      CodeName: item.LeaveTypeName,
    };
    item.OutPlace = {
      Code: item.OutPlace,
      CodeName: item.OutPlaceName,
    };*/
    this.navCtrl.push('MyapplydetailPage', { item:item });
  }



  /*
   * 下拉加载
   * */
  doInfinite(infiniteScroll) {
    this.Page++;
    this.http.postJSON({
      Router: ServelUrl.Url.querystudentleaveapplication,
      Method: 'POST',
      Body: {
        ApproveStatus: '1,3,4,6',
        Page: this.Page,
        PageNo: this.PageNo,
      }
    }).then(
      comments => {
        if (comments.Data&&comments.Data.length > 0) {
          this.moreData = true;
          this.items = this.items.concat(comments.Data);
        } else {
          this.moreData = false;
        }
        infiniteScroll.complete();
      },
      err => console.log(err));
  }

}

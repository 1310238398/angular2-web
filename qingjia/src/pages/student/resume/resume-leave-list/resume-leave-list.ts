import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HttpService} from "../../../../http/http.Service";
import {ServelUrl} from "../../../../app/ServelUrl";

/**
 * create by hanzhendong.
 *
 */
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-resume-leave-list',
  templateUrl: 'resume-leave-list.html',
})
export class ResumeLeaveListPage {
  searchQuery = '';
  items: Array<any> = [];
  Page: number = 0;
  moreData: boolean = true;
  PageNo: number = 10;

  constructor(public navCtrl: NavController, private http: HttpService) {

    this.initializeItems()
  }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: '销假列表',
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
        Page: this.Page,
        PageNo: this.PageNo,
        ApproveStatus: '2,5'
      }
    }).then(
      comments => {
        this.items = comments.Data || [];
        if (refresher) {
          refresher.complete();
        }
      });
  }

  /*
   * 跳转
   * */
  NavigationTo(item) {
    /*构造指令参数*/
    item.LeaveType = {
      Code: item.LeaveTypeCode,
      CodeName: item.LeaveTypeName,
    };
    item.OutPlace = {
      Code: item.OutPlaceCode,
      CodeName: item.OutPlaceName,
    };
    this.navCtrl.push('ResumeLeaveDetailPage', {leaveapply: JSON.stringify(item)});
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
        ApproveStatus: '2,5',
        Page: this.Page,
        PageNo: this.PageNo,
      }
    }).then(
      comments => {
        if (comments.Data.length > 0) {
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

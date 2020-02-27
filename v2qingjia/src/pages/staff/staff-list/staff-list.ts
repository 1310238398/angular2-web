import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HttpService} from "../../../http/http.Service";
import {CommonService} from "../../../app/service/CommonService";
import {ServelUrl} from "../../../app/ServelUrl";
import {HelpUtils} from "../../../app/utils/HelpUtils";

/**
 * Generated .by 韩振东
 *
 */
declare var antlinker;
declare var moment;

@IonicPage()
@Component({
  selector: 'page-staff-list',
  templateUrl: 'staff-list.html',
})
export class StaffListPage {

  searchQuery = '';
  ApproveStatus: string = '1';
  PendingApplyitems: Array<any> = [];//待审批
  Pendingxiaojiaitems: Array<any> = [];//待销假
  Finishxiaojiaitems: Array<any> = [];//已销假
  Refuseitems: Array<any> = [];//未批准
  Page: number = 0;
  moreData: boolean = true;
  PageNo: number = 10;
  pushFlag: boolean = false;

  constructor(private helpUtil: HelpUtils, public navCtrl: NavController, private http: HttpService, private commonService: CommonService) {

    this.initializeItems('1',true);
    this.initializeItems('2,5,6',true);
    this.initializeItems('3');
    this.initializeItems('4');
    /*  window.addEventListener('hashchange', function() {

          alert("location: " + document.location);

      }, false);
*/
  }

  ionViewDidEnter() {
    antlinker.configTitle({
      type: "label",
      title: '请假审批',
      fail: ()=>{},
      success: ''
    });
    antlinker.configTitleButton({
      type: 'back',
      text: '关闭',
      fail: ()=>{},
      success: ''
    });

  }

  initializeItems(ApproveStatus,shenpi=false) {
    var url='';
    if(shenpi){
      url=ServelUrl.Url.querydoflow
    }else {
      url=ServelUrl.Url.querystudentleaveapplication
    }
    this.http.postJSON({
      Router: url,
      Method: 'POST',
      Body: {
        Page: this.Page,
        PageNo: this.PageNo,
        ApproveStatus: ApproveStatus
      }
    }).then(
      data => {
        switch (ApproveStatus) {
          case '1':
            this.PendingApplyitems = data.Data || [];
            break;
          case '2,5,6':
            this.Pendingxiaojiaitems = data.Data || [];
            break;
          case '3':
            this.Finishxiaojiaitems = data.Data || [];
            break;
          case '4':
            this.Refuseitems = data.Data || [];
            break;
        }
      });
  }

  /*
   * 查询数据
   * */
  search($event, ApproveStatus,shenpi=false) {
    var url='';
    if(shenpi){
      url=ServelUrl.Url.querydoflow
    }else {
      url=ServelUrl.Url.querystudentleaveapplication
    }
    this.Page = 0;
    this.moreData = true;
    this.http.postJSON({
      Router: url,
      Method: 'POST',
      Body: {
        SearchValue: $event.target.value || '',
        Page: this.Page,
        PageNo: this.PageNo,
        ApproveStatus: ApproveStatus
      }
    }).then(
      data => {
        switch (ApproveStatus) {
          case '1':
            this.PendingApplyitems = data.Data || [];
            break;
          case '2,5,6':
            this.Pendingxiaojiaitems = data.Data || [];
            break;
          case '3':
            this.Finishxiaojiaitems = data.Data || [];
            break;
          case '4':
            this.Refuseitems = data.Data || [];
            break;
        }

      },
      err => console.log(err));
  }

  doRefresh(refresher, ApproveStatus,shenpi=false) {
    var url='';
    if(shenpi){
      url=ServelUrl.Url.querydoflow
    }else {
      url=ServelUrl.Url.querystudentleaveapplication
    }
    this.Page = 0;
    this.moreData = true;
    this.http.postJSON({
      Router: url,
      Method: 'POST',
      Body: {
        Page: this.Page,
        PageNo: this.PageNo,
        ApproveStatus: ApproveStatus
      }
    }).then(
      data => {
        switch (ApproveStatus) {
          case '1':
            this.PendingApplyitems = data.Data || [];
            break;
          case '2,5,6':
            this.Pendingxiaojiaitems = data.Data || [];
            break;
          case '3':
            this.Finishxiaojiaitems = data.Data || [];
            break;
          case '4':
            this.Refuseitems = data.Data || [];
            break;
        }
        refresher.complete()

      },
      err => console.log(err));
  }

  /*
   * 跳转
   * */
  NavigationTo(itemApply) {
    this.commonService.setPushFlag();
    if (itemApply.ApproveStatus == 0) {
      return;
    } else {
      this.navCtrl.push('StudentApplyDetailPage', {itemapply: JSON.stringify(itemApply)});
    }
  }

  ChangeApproveStatus(ApproveStatus) {
    this.ApproveStatus = ApproveStatus;
  }

  ionViewCanLeave() {
    console.log(this.commonService.getPushFlag())
    /* console.log('active'+this.navCtrl.getActive().index);
     console.log('privous'+this.navCtrl.getPrevious().index);*/
    /*   let his = this.navCtrl['_linker']._history;
       if (his.length == 1 && his[0] == '/') {
           console.log('离开');
           antlinker.closeView({
               success: function () {
               },
               fail: function () {

               },

           });

       }*/
  }

  isOver(EndDate) {
    //var endDate = moment(EndDate).format('YYYY-MM-DD HH:mm');
    var now = moment(new Date()).format('YYYY-MM-DD HH:mm');
    if (now>EndDate) {
      return true;
    }
    else {
      return false;
    }
  }

  haveDay(EndDate) {
    let now = moment(new Date()).format('YYYY-MM-DD HH:mm');
    let day = this.helpUtil.getDays(now, EndDate);
    return day > 0 ? day : 0;
  }

  /*
   * 下拉加载
   * */
  doInfinite(infiniteScroll, ApproveStatus, shenpi=false) {
    var url='';
    if(shenpi){
      url=ServelUrl.Url.querydoflow
    }else {
      url=ServelUrl.Url.querystudentleaveapplication
    }
    this.Page++;
    this.http.postJSON({
      Router: url,
      Method: 'POST',
      Body: {
        SearchValue: this.searchQuery,
        Page: this.Page,
        PageNo: this.PageNo,
        ApproveStatus: ApproveStatus
      }
    }).then(
      comments => {
        if (comments.Data.length > 0) {
          this.moreData = true;
          switch (ApproveStatus) {
            case '1':
              this.PendingApplyitems = this.PendingApplyitems.concat(comments.Data) || [];
              break;
            case '2,5,6':
              this.Pendingxiaojiaitems = this.Pendingxiaojiaitems.concat(comments.Data) || [];
              break;
            case '3':
              this.Finishxiaojiaitems = this.Finishxiaojiaitems.concat(comments.Data) || [];
              break;
            case '4':
              this.Refuseitems = this.Refuseitems.concat(comments.Data) || [];
              break;
          }
        } else {
          this.moreData = false;
        }
        infiniteScroll.complete();
      },
      err => console.log(err));
  }

}

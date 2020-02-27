import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { AppService } from "../../app/app.service";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {
  Departments = [];
  StaffTypes = [];
  SexObj = [];  //性别
  searchTxt = ''
  ajaxData = {
    jobNum: '',       //工号
    userName: '',     //  姓名
    departName: '',   //  行政单位
    staffType: '',    //  学工类型
    phoneNum: '',    // 手机号
    sex: '',          // 性别
  };


  constructor(public navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, private appService: AppService) { }

  ionViewWillEnter() {
    this.loadDepartment();  //获取行政单位
    this.loadStaffCate();  //获取学工类型
    this.loadSex();  //获取性别
  }

  //获取行政单位
  loadDepartment() {
    this.http.postJSON({
      Router: '/api/staffmanage/departmentinit',
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Departments = res.Data;
      }
    },
      err => console.log(err)
    );
  }

  //获取学工类型
  loadStaffCate() {
    this.http.postJSON({
      Router: '/api/classinfo/parameterinit',
      Method: 'POST',
      Body: {
        parameter: ['StaffType']
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.StaffTypes = res.Data;
      }
    },
      err => console.log(err)
    );
  }

  //获取性别
  loadSex() {
    this.http.postJSON({
      Router: '/api/classinfo/parameterinit',
      Method: 'POST',
      Body: {
        parameter: ['Sex']
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.SexObj = res.Data;
      }
    },
      err => console.log(err)
    );
  }


  //总提交
  tabSubmit() {
    if (!this.ajaxData.jobNum.trim()) {
      this.HelpUtils.toastPopTop('工号不能为空！');
      return;
    }
    if (!this.ajaxData.userName.trim()) {
      this.HelpUtils.toastPopTop('姓名不能为空！');
      return;
    }
    if (!this.ajaxData.departName.trim()) {
      this.HelpUtils.toastPopTop('行政单位不能为空！');
      return;
    }
    if (!this.ajaxData.staffType.trim()) {
      this.HelpUtils.toastPopTop('学工类型不能为空！');
      return;
    }
    if (!this.ajaxData.phoneNum.trim()) {
      this.HelpUtils.toastPopTop('手机号不能为空！');
      return;
    }
    if (!this.ajaxData.sex.trim()) {
      this.HelpUtils.toastPopTop('性别不能为空！');
      return;
    }

    this.http.postJSON({
      Router: '/api/staffmanage/useradd',
      Method: 'POST',
      Body: {
        UserCode: this.ajaxData.jobNum,
        Name: this.ajaxData.userName,
        Sex: this.ajaxData.sex,
        Phone: this.ajaxData.phoneNum,
        Password: '',
        RePassword: '',
        Email: '',
        AvailableLogin: '1',
        Department: this.ajaxData.departName,
        UserType: this.ajaxData.staffType,
        Auths: [{ DepartmentCode: this.ajaxData.departName, RoleCode: this.ajaxData.staffType }]
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPopTop('添加成功');
        this.ajaxData = {
          jobNum: '',       //工号
          userName: '',     //  姓名
          departName: '',   //  行政单位
          staffType: '',    //  学工类型
          phoneNum: '',    // 手机号
          sex: '',          // 性别
        };
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //返回
  exitSubmit() {
    antlinker.closeView({
      success: function () { },
      fail: function () { }
    });
  }

  //离开页面事件
  ionViewWillLeave() {
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    var d = document.querySelector('ion-backdrop');
    if (d) {
      d.dispatchEvent(event)
    }
  }


  //跳转搜索页
  serachRoom() {
    this.navCtrl.push('DisplayIndexPage', { searchTxt: this.searchTxt });
  }

  //软键盘跳转搜索页
  onSearchKeyUp(event) {
    if ("Enter" == event.key) {
      this.navCtrl.push('DisplayIndexPage', { searchTxt: this.searchTxt });
    }
  }









}

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as EXIF from 'exif-js';
import { IonicPage, NavController, AlertController, NavParams, ActionSheetController } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var qiniu;
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-shetuaninfo',
  templateUrl: 'shetuaninfo.html'
})
export class ShetuanInfoPage {

  isActive = false;
  retijiao;
  pet: string = "activity";
  SheTuanHonor = [];
  Activityfz = [];
  Activity = [];
  ActivityOne = {
    UnionName: '',
    membernum: '',
    activitynum: '',
    UnionInfo: '',
    RecordId: '',
    StaffCode: ''
  }

  ShetuanApply = {
    status: 7,
    PassInfo: '',
    ApplicationCode: ''
  }

  StudentInfo = {
    name: ''
  }
  moreData: boolean = true;
  moreDatae: boolean = true;
  moreDatar: boolean = true;

  gengduo = false;
  subStop: boolean = false;
  /*
    活动
  */
  ActivityCode;
  Name;
  Info;
  Time;
  Place;
  Connect;
  phone;
  num;
  applystatus;

  tstatus; //头回申请或被拒绝后再次申请
  fabus = false;
  activitystatus = 3;
  page = {
    Page: 1,
    PageSize: 10,
  };

  pagefabu = {
    Page: 1,
    PageSize: 10,
  };

  honorpage = {
    lastid: 1,
    count: 10
  };

  //alert
  message;
  title;
  cssClass;
  applytext;
  placeholder;

  deletestatus = false;
  deleteactivityCode;
  UnionCode;
  Member;
  UnionName;
  shetuanstatus;
  fileLoading;
  CertifyImgs = [];
  CertifyImg = {
    AttachmentURL: ''
  }
  RecordIdArr = [] //存储后台返回的RecordID
  showmage = false;
  touxiang = false;
  honorpicture = false;
  honorsrc;

  /*
  社团申请
*/
  ApplyInfo;
  ApplyMember = [];
  missstatus = false;
  Applypage = {
    Page: 1,
    PageSize: 100,
  };

  substatus = false;
  shenqingapply;
  applymiss;
  StaffCode;
  rorateAngle = 0;

  @ViewChild('imgElement')
  imgElement: ElementRef;

  constructor(private navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private http: HttpService, private HelpUtils: HelpUtils, private DomS: DomSanitizer, public actionSheetCtrl: ActionSheetController) {
    this.UnionCode = this.navParams.get('UnionCode');
    this.Member = this.navParams.get('Member');
    this.shetuanstatus = this.navParams.get('shetuanstatus');
    if (this.UnionCode && this.shetuanstatus) {
      this.sesstionCut();
    }
  }
  //初始化加载
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "社团风采",
      fail: function () { },
      success: function () { }
    });
    // 右上角按钮
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
  }

  //初始化加载
  ionViewDidEnter() {
    if (!this.UnionCode) {
      this.UnionCode = sessionStorage.getItem('UnionCode');
    }
    if (!this.shetuanstatus) {
      this.shetuanstatus = sessionStorage.getItem('shetuanstatus');
    }
    if (this.shetuanstatus == 3) {
      this.ShetuanApply.status = 0;
    }
    this.getallactivityinfo(true);
    this.getallactivityfabuinfo(true);
    this.getownapplyinfo();
    this.getshetuaninfo();
    this.getunionhonorinfo();
    this.getname();
    this.getapplyinfo();
    // this.presentActionSheet();
    // alert(this.ActivityOne.UnionInfo);
  }


  //跳转图片放大
  navPreview(params) {
    this.navCtrl.push('PreviewPhotoPage', params)
  }

  //存储缓存
  sesstionCut() {
    sessionStorage.setItem('UnionCode', this.UnionCode);
    sessionStorage.setItem('shetuanstatus', this.shetuanstatus);
    console.log(7);
    console.log(sessionStorage.getItem('UnionCode'));
  }

  subapplication(m) {
    this.substatus = true;
    this.tstatus = m;
  }
  cancel() {
    this.substatus = false;
    this.shenqingapply = null;
  }
  applicationsub() {
    if (this.shenqingapply) {
      this.ApplyInfo = this.shenqingapply;
    } else {
      this.ApplyInfo = this.placeholder;
    }
    this.addshetuanapply();
    this.substatus = false;

  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: this.title,
      message: this.message,
      cssClass: this.cssClass,
      // inputs: [
      //   {
      //     name: 'title',
      //     placeholder: 'Title',
      //     // type: 'password'

      //   },
      // ],
      buttons: [
        {
          text: this.applytext,
          handler: data => {
            console.log('Cancel clicked');
          }
        },
      ]
    });
    prompt.present();
  }

  // presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     // title: 'Modify your album',
  //     cssClass:'headChoice',
  //     buttons: [
  //       {
  //         text: '查看大图',
  //         role: 'destructive',
  //         handler: () => {
  //          this.popup();
  //         }
  //       },
  //       {
  //         text: '更换头像',
  //         handler: () => {
  //           this.handleFiles(File);
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });

  //   actionSheet.present();
  // }

  change() {
    this.gengduo = !this.gengduo;
  }

  retijiaobefore(m) {
    this.retijiao = 1;
    this.activitystatus = 1;
    this.ActivityCode = m.ActivityCode;
    this.UnionName = this.ActivityOne.UnionName;
    this.Name = m.Activity;
    this.Info = m.Info;
    this.Time = m.Starttime;
    this.Place = m.Place;
    this.Connect = m.Connect;
    this.phone = m.phone;
    this.num = m.peoplenum;

  }

  retijiaosub() {
    this.navCtrl.push('ActivityPage', {
      UnionCode: this.UnionCode,
      ActivityCode: this.ActivityCode,
      activitystatus: this.activitystatus,
      shetuanstatus: this.shetuanstatus,
      retijiao: this.retijiao,
      UnionName: this.UnionName,

    })
  }

  closere() {
    this.retijiao = null;
  }

  shenqing() {
    this.subStop = true;
    this.UnionName = this.ActivityOne.UnionName;
    this.StaffCode = this.ActivityOne.StaffCode;
    this.navCtrl.push('ActivityPage', {
      UnionCode: this.UnionCode,
      StaffCode: this.StaffCode,
      UnionName: this.UnionName,
      shetuanstatus: this.shetuanstatus
    });
  }

  fabubefore(m) {
    this.activitystatus = 4;
    this.ActivityCode = m.ActivityCode;
    this.Name = m.Activity;
    this.Info = m.Info;
    this.Time = m.Starttime;
    this.Place = m.Place;
    this.Connect = m.Connect;
    this.phone = m.phone;
    this.num = m.peoplenum;
    this.fabus = true;
  }

  closefa() {
    this.fabus = false;
  }

  //活动总结
  zongjie(m) {
    this.activitystatus = 5;
    this.ActivityCode = m.ActivityCode;
    this.navCtrl.push('ActivityEndPage', {
      ActivityCode: this.ActivityCode,
      activitystatus: this.activitystatus,
      UnionCode: this.UnionCode,
      shetuanstatus: this.shetuanstatus,
    });


  }

  fabu() {
    this.http.postJSON({
      Router: ServelUrl.Url.updateactivity,
      Method: 'POST',
      Body: {
        Status: this.activitystatus,      //status
        Code: this.ActivityCode,                 // 社团code
        Name: this.Name,             // 活动名称
        Info: this.Info,             // 活动内容
        Time: this.Time,                       // 创建时间
        Place: this.Place,           // 地点
        Connect: this.Connect,       // 联系人
        Phone: this.phone,           // 联系方式
        Num: this.num                // 预计参加人数
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPopTop('发布成功');
        this.navCtrl.push('ShetuanInfoPage', {
          UnionCode: this.UnionCode,
          shetuanstatus: this.shetuanstatus
        });
      } else {
        this.HelpUtils.toastPopTop(res);
      }
    },
      err => console.log(err)
    );

  }

  activitychange() {
    this.activitystatus = 1;
    this.UnionName = this.ActivityOne.UnionName;
    this.navCtrl.push('ActivityPage', {
      UnionCode: this.UnionCode,
      ActivityCode: this.ActivityCode,
      activitystatus: this.activitystatus,
      shetuanstatus: this.shetuanstatus,
      UnionName: this.UnionName,

    });
  }

  deleteactivity(m) {
    this.deletestatus = true;
    this.deleteactivityCode = m.ActivityCode;
  }

  deletecancel() {
    this.deletestatus = false;
  }

  deletego() {
    this.deletestatus = false;
    this.http.postJSON({
      Router: ServelUrl.Url.deleteactivity,
      Method: 'POST',
      Body: {
        Code: this.deleteactivityCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('删除成功');
        this.getallactivityinfo(true);
        this.getallactivityfabuinfo(true);
      } else {
        this.HelpUtils.toastPopTop(res);
      }
    })

  }

  subhonor() {
    this.subStop = true;
    this.navCtrl.push('HonorPage', {
      UnionCode: this.UnionCode,
      shetuanstatus: this.shetuanstatus,
      Member: this.Member

    });

  }

  //活动总结展示
  subendpage() {
    this.navCtrl.push('PreviewPage', {
      UnionCode: this.UnionCode,
      shetuanstatus: this.shetuanstatus,
      Member: this.Member
    });

  }

  //成员页跳转
  submemberpage() {
    this.UnionName = this.ActivityOne.UnionName
    this.navCtrl.push('ShetuanMemberPage', {
      UnionCode: this.UnionCode,
      UnionName: this.UnionName,
      shetuanstatus: this.shetuanstatus,
      Member: this.Member
    });

  }


  showimage() {
    this.showmage = !this.showmage;
  }

  popup() {
    console.log(799);
    this.touxiang = !this.touxiang;
    this.showmage = false;

    //点击后弹出隐藏界面
  }

  closesr() {
    this.showmage = false;
  }


  //加载社团活动
  getallactivityinfo(reload = false) {
    if (reload) {
      this.page.Page = 1;
    }
    console.log(1);
    this.http.postJSON({
      Router: ServelUrl.Url.getallactivityinfo,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
        Aname: null,
        Uname: this.UnionCode,
        Code: null,
        Sbtime: null,
        Setime: null,
        Pbtime: null,
        Petime: null
      }
    }).then(res => {
      if (!res.FeedbackCode) {

        this.Activity = res.Data.Datas;
        console.log(this.Activity);

      }
    })

  }

  //加载所有已发布或者总结的社团活动
  getallactivityfabuinfo(reload = false) {
    if (reload) {
      this.pagefabu.Page = 1;
    }

    console.log(1);
    this.http.postJSON({
      Router: ServelUrl.Url.getallactivityfabuinfo,
      Method: 'POST',
      Body: {
        PageNum: this.pagefabu.Page++,
        PageSize: this.pagefabu.PageSize,
        Aname: null,
        Uname: this.UnionCode,
        Code: null,
        Sbtime: null,
        Setime: null,
        Pbtime: null,
        Petime: null
      }
    }).then(res => {
      if (!res.FeedbackCode) {

        this.Activityfz = res.Data.Datas;
        console.log(this.Activity);

      }
    })

  }


  doInfinitea(infiniteScroll) {
    this.http.postJSON({
      Router: ServelUrl.Url.getallactivityinfo,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
        Aname: null,
        Uname: this.UnionCode,
        Code: null,
        Sbtime: null,
        Setime: null,
        Pbtime: null,
        Petime: null
      }
    }).then(res => {
      if (res.Data.Datas.length && !res.FeedbackCode) {
        this.moreData = true;
        this.Activity = this.Activity.concat(res.Data.Datas);

      } else {
        this.moreData = false;
      }
      infiniteScroll.complete();

    })
  }

  doInfinite(infiniteScroll) {
    this.http.postJSON({
      Router: ServelUrl.Url.getallactivityfabuinfo,
      Method: 'POST',
      Body: {
        PageNum: this.pagefabu.Page++,
        PageSize: this.pagefabu.PageSize,
        Aname: null,
        Uname: this.UnionCode,
        Code: null,
        Sbtime: null,
        Setime: null,
        Pbtime: null,
        Petime: null
      }
    }).then(res => {
      if (res.Data.Datas.length && !res.FeedbackCode) {
        this.moreDatae = true;
        this.Activityfz = this.Activityfz.concat(res.Data.Datas);

      } else {
        this.moreDatae = false;
      }
      infiniteScroll.complete();

    })
  }

  //上拉加载社团荣誉
  doInfiniter(infiniteScroll) {
    console.log('荣誉');
    this.http.postJSON({
      Router: ServelUrl.Url.getunionhonorinfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
        pageindex: this.honorpage.lastid++,
        pagesize: this.honorpage.count
      }
    }).then(res => {
      if (res.Data.data && !res.FeedbackCode) {
        this.moreDatar = true;
        this.SheTuanHonor = this.SheTuanHonor.concat(res.Data.data);

      } else {
        this.moreDatar = false;
        console.log('荣誉wu');
      }
      infiniteScroll.complete();

    })
  }



  //加载头部社团信息
  getshetuaninfo() {
    console.log(2);
    this.http.postJSON({
      Router: ServelUrl.Url.getshetuaninfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.ActivityOne = res.Data;
        // alert(this.ActivityOne.UnionInfo);
        this.CertifyImg.AttachmentURL = res.Data.AttachmentURL
        console.log(this.ActivityOne);
        if (this.ShetuanApply.status == 3) {
          this.cssClass = 'applyalert';
          this.title = '恭喜你';
          this.applytext = '好 的'
          this.message = '你已经成为' + this.ActivityOne.UnionName + '的一员,请关注社团发布的信息，积极参与社团活动，认识更多的小伙伴吧。'
          this.applystatus = 5;
          this.showPrompt();
          this.updateshetuanapply();

        }


      }
    })

  }

  //加载社团荣誉
  getunionhonorinfo() {
    console.log(9);
    this.http.postJSON({
      Router: ServelUrl.Url.getunionhonorinfo,
      Method: 'POST',
      Body: {
        Uname: this.UnionCode,
        pageindex: this.honorpage.lastid++,
        pagesize: this.honorpage.count
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data.data) {
        // for (let i = 0; i < res.length; i++) {
        //   res[i].Data = JSON.parse(res[i].Data);
        // }
        this.SheTuanHonor = this.SheTuanHonor.concat(res.Data.data);
        console.log(this.SheTuanHonor);
        // this.gengduocheck();

      }
    })

  }

  //加载个人姓名
  getname() {
    this.http.postJSON({
      Router: ServelUrl.Url.getname,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        // for (let i = 0; i < res.length; i++) {
        //   res[i].Data = JSON.parse(res[i].Data);
        // }
        this.StudentInfo = res.Data;
        console.log('abcd' + this.StudentInfo);
        this.placeholder = '你好，我是' + this.StudentInfo.name + '我想加入咱们社团';

      }
    })

  }

  //社团头像存储
  updateunionavatar() {
    var RecordIdString = this.RecordIdArr.join(',')
    this.http.postJSON({
      Router: ServelUrl.Url.updateunionavatar,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,                 // 社团code
        AttachmentCode: RecordIdString,        // 图像id
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('save avatar success');
        this.HelpUtils.toastPopTop('图片更换成功');
        this.getshetuaninfo();
      } else {
        console.log('save avatar fail');
      }
    },
      err => console.log(err)
    );

  }

  //======七牛上传

  upload(obj) {

    this.fileLoading = this.HelpUtils.loadingPop('正在上传，请稍等...');

    var that = this;
    var observable = qiniu.upload(obj.file, obj.key, obj.token, {
      mimeType: ["image/png", "image/jpeg", "image/jpg"]
    }, {
        useCdnDomain: true
      });
    var observer = {
      next(res) {
        console.log(res)
        // ...
      },
      error(err) {
        that.HelpUtils.toastPop(err.message);
        return false
        // ...
      },
      complete(res) {
        var file = obj.file;
        that.fileLoading.dismiss();

        that.http.postJSON({
          Router: ServelUrl.Url.saveAttach, Method: 'POST', Body: {
            BizType: 'StudentNeedSupport',
            AttachmentItemName: file.name || '',
            AttachmentItemType: file.type,
            AttachmentItemSize: file.size.toString(),
            AttachmentURL: res.key,
            Base64: '',
          }
        }).then(response => {
          if (!response.FeedbackCode) {
            that.RecordIdArr.push(response.Data.RecordID);
            that.CertifyImg.AttachmentURL = window.URL.createObjectURL(file),

              that.updateunionavatar();
            that.showmage = false;


          } else {
            that.HelpUtils.toastPop(response.FeedbackText);
          }
          console.log(res);
        })
      }
    };
    var subscription = observable.subscribe(observer); // 上传开始
  }

  handleFiles(event) {
    console.log(event);
    var file = event.target.files[0];

    console.log(file.size, '11111111111')

    if (file.size > 5242880) {
      this.HelpUtils.toastPop('文件大小限制:5M');
      return
    }
    if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
      this.HelpUtils.toastPop('格式错误,请选择"png,jpeg,jpg"格式文件上传');
      return
    }
    this.http.postJSON({
      Router: ServelUrl.Url.getUpToken,
      Method: 'POST',
      Body: {
        Name: file.name,
        Size: file.size,
        BizType: "SchoolApply"
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof })
      } else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
        this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    })
  }


  /*
  社团申请
  */

  addshetuanapply() {

    this.http.postJSON({
      Router: ServelUrl.Url.addshetuanapply,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,         // 社团code
        Info: this.ApplyInfo,        // 申请理由
        Status: 1,                 // status
        Tstatus: Number(this.tstatus)       //判断初回还是被拒绝

      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('save apply success');
        this.getownapplyinfo();

      } else {
        console.log('save apply fail');
      }
    },
      err => console.log(err)
    );

  }


  //获取自己申请详情
  getownapplyinfo() {
    this.http.postJSON({
      Router: ServelUrl.Url.getownapplyinfo,
      Method: 'POST',
      Body: {
        Code: this.UnionCode,         // 社团code

      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.ShetuanApply = res.Data;
        if (this.ShetuanApply.status == 2) {
          this.cssClass = 'passalert';
          this.title = '社团负责人拒绝了你的加入申请';
          this.applytext = '关 闭';
          this.message = '拒绝理由：' + this.ShetuanApply.PassInfo;
          this.applystatus = 4;
          this.showPrompt();
          this.updateshetuanapply();
        }


      } else {
        console.log('save apply fail');
      }
    },
      err => console.log(err)
    );
  }


  //更新社团申请最终
  updateshetuanapply() {

    this.http.postJSON({
      Router: ServelUrl.Url.updateshetuanapply,
      Method: 'POST',
      Body: {
        Code: this.ShetuanApply.ApplicationCode,         // 申请code
        Info: this.ShetuanApply.PassInfo,               // 拒绝理由
        Status: this.applystatus,                                     // status

      }
    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('update apply success');
        this.getownapplyinfo();

      } else {
        console.log('update apply fail');
      }
    },
      err => console.log(err)
    );

  }

  //加载当前社团申请列表
  getapplyinfo() {
    console.log(1);
    this.http.postJSON({
      Router: ServelUrl.Url.getapplyinfo,
      Method: 'POST',
      Body: {
        PageNum: this.Applypage.Page,
        PageSize: this.Applypage.PageSize,
        Code: this.UnionCode,
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data.Datas) {

        this.ApplyMember = res.Data.Datas;
        this.applymiss = this.ApplyMember.filter(item => item.status == 1)
        console.log('ab' + Boolean(this.applymiss.length));
        // if (applymiss.length) {
        //   this.missstatus = true;
        // }

      }
    })

  }


  getInfo() {
    let that = this
    EXIF.getData(this.imgElement.nativeElement, function () {
      const imgInfo = EXIF.getAllTags(this)
      const imgRotate = EXIF.getTag(this, 'Orientation')
      console.log(imgInfo)

      switch (imgRotate) {
        // 顺时针旋转90度  
        case 0:
          that.rorateAngle = 90
          break;
        // 逆时针旋转90度  
        case 8:
          that.rorateAngle = -90
          break;
        case 3:
          that.rorateAngle = 180
          break;
      }
    })

  }

}


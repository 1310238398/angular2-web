import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../http/http.Service";
import {HelpUtils} from "../../../../app/utils/HelpUtils";
import {CommonService} from "../../../../app/service/CommonService";
import {ServelUrl} from "../../../../app/ServelUrl";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class by hanzhendong.
 */
declare var antlinker;
declare var AMap;
declare var Qiniu;
declare var plupload;
declare var moment;

@IonicPage()
@Component({
  selector: 'page-resume-leave-address',
  templateUrl: 'resume-leave-address.html',
})
export class ResumeLeaveAddressPage {
  uploader;
  fileLoading;
  isDisabled = true;
  TaskCode: string;
  applyDate: string = new Date().toISOString();
  map;
  Certify = {
    AttachmentKey: '',
    AttachmentCode: ''
  };
  arriveSchool=false;
  isWaring: boolean = false;
  @ViewChild('containerMap') mapElement: ElementRef;
  SchoolPath: Array<any> = [
    117.131944, 36.673466
  ];
  SchoolRadius: number;
  CertifyImgs = [];
  currentPosition: Array<any> = [];
  UserInfo = {
    Name: '',
    UserCode: '',
    AcademyName: '',
    ClassName: '',
    applyDate: ''
  };

  constructor(private loadingCtrl: LoadingController, private DomSanitization: DomSanitizer, private navCtrl: NavController, private http: HttpService, private params: NavParams, private HelpUtils: HelpUtils, commonService: CommonService) {
    commonService.getSchoolLocation().then(data => {
      this.SchoolPath = data.Data.LocationCenter.split(',');
      this.SchoolRadius = data.Data.LocationRadius;
    });
    this.TaskCode = this.params.get('TaskCode');
  }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: '销假列表',
      fail: () => {
      },
      success: ''
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "empty",
      success: '',
      fail: () => {
      }
    });
  }

  initQiniu() {
    this.uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: 'pickfilesImg',
      domain: 'http://qiniu-plupload.qiniudn.com/',
      //container: 'container',
      uptoken_func: (file) => {    // 在需要获取uptoken时，该方法会被调用
        var uptoken = '';
        this.http.postXhr({
          Router: ServelUrl.Url.getUpToken,
          Method: 'POST',
          Body: {
            Name: file.name,
            Size: file.size,
            BizType: "LeaveApplication"
          }
        }, (value) => {
          if (value.Data && value.Data.Proof) {
            this.Certify.AttachmentKey = value.Data.Key || "";
            this.Certify.AttachmentCode = value.Data.AttachmentCode || "";
            uptoken = `${value.Data.Proof}`;
          }
        });
        return uptoken
      },
      filters: {
        max_file_size: '3mb',
        prevent_duplicates: true,
        mime_types: [
          {title: "Image files", extensions: "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
        ]
      },
      save_key: false,
      disable_statistics_report: true,
      unique_names: false,
      get_new_uptoken: true,
      max_file_size: '3mb',
      max_retries: 3,
      log_level: 5,
      flash_swf_url: 'assets/lib/Moxie.swf',
      multi_selection: false,
      dragdrop: false,
      chunk_size: '3mb',
      auto_start: true,
      resize: {
        quality: 60
      },
      init: {
        'Key': (up, file) => {
          return this.Certify.AttachmentKey || ''
        },
        'FilesAdded': (up, files) => {
          // this.CertifyImgs = [];
          //选择文件后进行操作
          if (this.CertifyImgs.length >= 3) {
            up.splice();
            this.HelpUtils.alert('证明材料最多可选择三张');
          } else {
            this.fileLoading = this.loadingCtrl.create({
              content: '正在上传，请稍等...'
            });
            this.fileLoading.present();
          }

        },
        'BeforeUpload': (up, file) => {
          //上传之前可能的操作
        },
        'UploadProgress': function (up, file) {
        },
        'FileUploaded': (up, file, info) => {
          console.log(moment(file.getNative().lastModifiedDate).format('YYYY-MM-DD HH:mm'));
          var obj = Object.assign(
            {
              url: window.URL.createObjectURL(file.getNative()),
              AttachmentTime: moment(file.getNative().lastModifiedDate).format('YYYY-MM-DD HH:mm')
            },
            this.Certify);
          this.CertifyImgs.push(obj);
        },
        'UploadComplete': () => {
          this.fileLoading.dismiss();
        },
        'Error': (up, err, errTip) => {
          //如果报错可能的操作
          console.log(err);
          if (err.code == '-600') {
            this.HelpUtils.toastPop('文件过大，最大为3M!');
          }
        }
      }
    })
  }
  ionViewDidLoad() {

    /***************************************
     由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
     ***************************************/
    var geolocation;
    //加载地图，调用浏览器定位服务
    this.map = new AMap.Map(this.mapElement.nativeElement, {
      resizeEnable: true
    });
    this.map.plugin('AMap.Geolocation', () => {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
      });
      this.map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', (data) => {
        this.currentPosition = [];
        this.currentPosition.push(data.position.getLng());
        this.currentPosition.push(data.position.getLat());
        console.log(this.currentPosition);
        this.isDisabled = false;
        var str = ['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        str.push('精度：' + data.accuracy + ' 米');
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        console.log(str.join('<br>'))
        var circle = new AMap.Circle({
          map: this.map,
          center: this.SchoolPath,// 圆心位置
          radius: this.SchoolRadius, //半径
          strokeColor: "#F33", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 3, //线粗细度
          fillColor: "#ee2200", //填充颜色
          fillOpacity: 0.35//填充透明度
        });
        this.map.setFitView();
        if (circle.contains(this.currentPosition)) {
          this.arriveSchool = true;
        }
      });
      //定位错误信息
      AMap.event.addListener(geolocation, 'error', (data) => {
        // this.HelpUtils.toastPop(data.info + ':' + data.message);
        // this.HelpUtils.toastPop('提示' + ':' + '系统定位故障，！');
        this.isWaring = true;
      });
    });
    this.initQiniu();
  }

 /* onConfirmSubmit() {
    this.isWaring = false;
    console.log(this.currentPosition);
    //todo 点击后关闭polygon
    //this.polygon.close();
    if (this.currentPosition.length == 2) {
      var circle = new AMap.Circle({
        map: this.map,
        center: this.SchoolPath,// 圆心位置
        radius: this.SchoolRadius, //半径
        strokeColor: "#F33", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#ee2200", //填充颜色
        fillOpacity: 0.35//填充透明度
      });
      this.map.setFitView();
      console.log("是否在范围内：", circle.contains(this.currentPosition));
      if (circle.contains(this.currentPosition)) {
        this.applyXiaojia({
          TaskCode: this.TaskCode,
          Location: this.currentPosition.join(),
          Attachs: this.CertifyImgs || []
        })
      } else {
        if (!this.CertifyImgs.length) {
          this.isWaring = true;
          return;
        }

        this.applyXiaojia({
          TaskCode: this.TaskCode,
          Location: '',
          Attachs: this.CertifyImgs || []
        })
        //this.HelpUtils.toastPop('定位未在学校范围内，请重新定位（请点击地图右下角图标）或上传照片证明本人已到校');
      }

    } else {
      this.isWaring = true;
      if (!this.CertifyImgs.length) {
        this.HelpUtils.toastPop('尚未定位到学校范围，请上传证明材料！');
        return;
      }
      this.applyXiaojia({
        TaskCode: this.TaskCode,
        Location: '',
        Attachs: this.CertifyImgs || []
      })
      //this.HelpUtils.toastPop('尚未获取到您的位置信息！');
    }

  }*/
  onConfirmSubmit() {
    this.isWaring = false;
    console.log(this.currentPosition);
    //this.polygon.close();
    if (this.currentPosition.length == 2) {
      if (this.arriveSchool) {
        this.applyXiaojia({
          TaskCode: this.TaskCode,
          Location: this.currentPosition.join(),
          Attachs: this.CertifyImgs || []
        })
      } else {
        if (!this.CertifyImgs.length) {
          this.isWaring = true;
          return;
        }

        this.applyXiaojia({
          TaskCode: this.TaskCode,
          Location: '',
          Attachs: this.CertifyImgs || []
        })
        //this.HelpUtils.toastPop('定位未在学校范围内，请重新定位（请点击地图右下角图标）或上传照片证明本人已到校');
      }

    } else {
      this.isWaring = true;
      if (!this.CertifyImgs.length) {
        this.HelpUtils.toastPop('尚未定位到学校范围，请上传证明材料！');
        return;
      }
      this.applyXiaojia({
        TaskCode: this.TaskCode,
        Location: '',
        Attachs: this.CertifyImgs || []
      })
      //this.HelpUtils.toastPop('尚未获取到您的位置信息！');
    }

  }
  applyXiaojia(Body) {
    this.http.postJSON({
      Router: ServelUrl.Url.recallapply,
      Method: 'POST',
      Body: Body
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.HelpUtils.toastPop('销假申请已提交，已放入销假列表中！');
          this.navCtrl.push('ListPage');
        }
      });
  }

  deleteCertify(event, index) {
    this.CertifyImgs.splice(index);
    event.stopPropagation();

  }

  navPreview(params) {
    this.navCtrl.push('PreviewPage', params)
  }

}

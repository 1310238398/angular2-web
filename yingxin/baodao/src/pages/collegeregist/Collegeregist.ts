/*
 * create by hanzhendong 2016/11/27
 * */
import { Component} from '@angular/core';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { HttpService } from "../../http/http.Service";
import { AppService } from "../../app/app.serve";
import { ProfessionalrePage } from "./professionalregist/Professionalregist";
import { SeachPersonPage } from "./seachperson/Seachperson";
import { NavController } from "ionic-angular";
import { SanitizeHtmlPipe } from "../../app/utils/SanitizeHtmlPipe";
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'page-collegeregist',
  templateUrl: 'collegeregist.html'
})
export class CollegerePage {
  searchQuery = '';
  items: Array<any> = [];
  moreData: boolean = true;
  loading: any;
  campus= {
    CampusLogo: '',
    CheckinStatus: '',
    CampusName: '',
    RecruitNum: '',
    ReportedNum: '',
    ReportedRate: ''
  }
  constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService ,private appService: AppService) {
    //页面初始加载数据
    appService.getCampusInfo().then(
      comments => {
        this.campus = comments.Data || [];
      }

    );
    //学院的数据
    appService.getAcademyQuery().then(
      Comment => {
        this.items = Comment.Data || [];
        // console.log(this.items);
      }
    );
    //定时任务
    const interval = setInterval(()=> {
      appService.getCampusInfo().then(
      comments => {
        this.campus = comments.Data || [];
      }

    );

      appService.getAcademyQuery().then(
      Comment => {
         this.items = Comment.Data || []
       
      
      });
        if(this.campus.CheckinStatus=='2'){
          clearInterval(interval);
 appService.getCampusInfo().then(
      comments => {
        this.campus = comments.Data || [];
      }

    );
    //学院的数据
    appService.getAcademyQuery().then(
      Comment => {
        this.items = Comment.Data || [];
        console.log(this.items);
      }
    );
        }
    }, 5000);

    antlinker.configTitle({
      type: "label",
      title: '报到实时情况',
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
      trigger: function () {
      }

    });
  }

  /*  ionViewDidLoad() {
   this.initializeItems()
   }*/

       /*
   * 查询页面跳转查询
   * */
  navToSearch() {
         this.navCtrl.push(SeachPersonPage);
           localStorage.removeItem('searchQuery');
        }

   /*
   * 跳转
   * */
  NavigationTo(chat) {
    // console.log(chat.AcademyCode);
     this.appService.setCurrentAcademy(chat.AcademyCode);
         this.navCtrl.push(ProfessionalrePage);
        }
 
}

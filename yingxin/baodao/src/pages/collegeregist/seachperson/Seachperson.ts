/**
 * Created by hanzhendong on 2017/5/4.
 */
// import {Component,ElementRef,ViewChild} from "@angular/core";
import {Component} from "@angular/core";
import {NavController, IonicPage} from "ionic-angular";
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {HttpService} from "../../../http/http.Service";
import {ServelUrl} from "../../../app/ServelUrl";
import { AppService } from "../../../app/app.serve";
import { PersoninfoPage } from "../professionalregist/classregist/everyclass/personinfo/Personinfo";

@Component({
  selector: "page-seachperson",
  templateUrl: './seachperson.html'
})
export class SeachPersonPage {
  searchQuery = '';
  history: boolean = true;
  items : Array<any>=[];
  HisItems = [];
  loading: any;
// @ViewChild('someVar') el:ElementRef;
  constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService,private appService:AppService) {
    // this.aotu();
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

    ionViewDidEnter() {
       
        this.searchQuery = JSON.parse(localStorage.getItem('searchQuery'));
        if(this.searchQuery){
        this.search(); 
      }
    }
      ionViewWillLeave() {
        localStorage.setItem('searchQuery', JSON.stringify(this.searchQuery));
        
    }
      // aotu(){
      //     var test = document.activeElement.autofocus(true);
  
         
      // }
//       ngAfterViewInit()
// {
//    this.el.nativeElement.focus();
//   // this.el.nativeElement.autofocus="true";
// }
  /**
   * 获取查询数据
   */
  search() {
    if(!this.searchQuery){
 this.HelpUtils.toastPop(`输入不能为空！`);
 this.items = [];
 return;
    }
    this.loading = this.HelpUtils.loadingPop();
    this.http.postJSON({
      Router: ServelUrl.Url.seachquery,
      Method: 'POST',
      Body: {  
        Name: this.searchQuery ||'',
      }
    }).then(
      comments => {
        this.loading.dismiss();
         if (comments.Data) {
        this.items = comments.Data;
      }
        else {
             this.items =[];
               this.HelpUtils.toastPop(`${comments.FeedbackText}`);
            }
        
      },
      err => console.log(err));
  }


  NavDetail(his) {
    //TODO
     this.appService.setCurrentPerson(his.UserId);
      this.navCtrl.push(PersoninfoPage);
  //  this.navCtrl.push(PersoninfoPage, {'his': his});
  }

}

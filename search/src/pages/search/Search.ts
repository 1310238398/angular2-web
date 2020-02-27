/*
 * create by hanzhendong 2016/11/27
 * */
import { Component,ViewChild,Renderer, ElementRef } from '@angular/core';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { HttpService } from "../../http/http.Service";
import { DetailPage } from "./detail/Detail";
import { NavController } from "ionic-angular";
import { SanitizeHtmlPipe } from "../../app/utils/SanitizeHtmlPipe";
import { Pipe, PipeTransform } from '@angular/core';
import { Content, Searchbar } from 'ionic-angular';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchQuery = '';
  items: Array<any> = [];
  Page: number = 0;
  moreData: boolean = true;
  PageNo: number = 10;
  loading: any;
 @ViewChild('si') searchInput: Searchbar;
  @ViewChild(Content) content: Content;
    @ViewChild('searchbar') searchBar:Searchbar;
  constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService,) {
     this.initia();
    antlinker.configTitle({
      type: "label",
      title: '学生查询',
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

// ionViewDidEnter() {

//         let cacheSeachApply = JSON.parse(localStorage.getItem(this.searchQuery));
//         if (cacheSeachApply) {
//             this.searchQuery = cacheSeachApply.searchQuery;
//         }
          
// }
initia(){
  localStorage.removeItem('searchQuery');
  console.log("初始进入");
}
// ionViewDidLoad(): void {
//   setTimeout(() => {
//     console.log('34u93u');
//     this.searchInput.setFocus();
//     this.searchInput.getNativeElement().click();  
// }, 3000);
// }
 ionViewDidEnter() {
       
        this.searchQuery = JSON.parse(localStorage.getItem('searchQuery'));
        console.log(this.searchQuery);
        if(this.searchQuery){
        this.search(this.searchQuery); 
        console.log("调用查询方法");
      }
    }
      ionViewWillLeave() {
        console.log(this.searchQuery);
        localStorage.setItem('searchQuery', JSON.stringify(this.searchQuery));
        console.log(this.searchQuery);
        console.log("进入详情")
        
    }
  /*
   * 查询数据
   * */
  search($event) {
    // this.loading = this.HelpUtils.loadingPop();
    this.Page = 0;
    this.moreData = true;
    this.http.postJSON({
      Router: ServelUrl.Url.YelloPageList,
      Method: 'POST',
      Body: {
        // param: $event.target.value||this.searchQuery,
        param:this.searchQuery ||'',
        Page: this.Page,
        PageNo: this.PageNo,
      }
    }).then(
      comments => {
        this.items = comments.Data || [];
        console.log(this.items);
        this.content.scrollToTop();
        // this.loading.dismiss();
      },
      err => console.log(err));
  }
//  ionViewWillLeave() {
//         localStorage.removeItem('SeachApply');
//     }
// ionViewDidEnter() {
// console.log("ionViewDidEnter " + this.searchQuery);
      
// }
   /*
   * 跳转
   * */
  NavigationTo(chat) {
    console.log();
         this.navCtrl.push(DetailPage, {'chat': chat});
        }
  /*
   * 上拉刷新
   * */
  doRefresh(refresher) {
    this.http.postObserJSON({
      Router: ServelUrl.Url.YelloPageList,
      Method: 'POST',
      Body: {
        param: this.searchQuery||'',
        Page: this.Page,
        pageNo: this.PageNo,
      }
    }).subscribe(
      comments => {
        this.items = comments.Data || [];
        refresher.complete();
      },
      err => console.log(err))
    ;
  }

  /*
   * 下拉加载
   * */
  doInfinite(infiniteScroll) {
    this.Page++;
    this.http.postJSON({
      Router: ServelUrl.Url.YelloPageList,
      Method: 'POST',
      Body: {
        param: this.searchQuery||'',
        Page: this.Page,
        PageNo: this.PageNo,
      }
    }).then(
      comments => {
        if (comments.Data) {
          this.moreData = true;
          this.items = this.items.concat(comments.Data);
        } 
        // else {
        //   if(comments.FeedbackText=="暂无数据") {
        //   this.moreData = false;}
        // }
        else  {
          this.moreData = false;
        }
        infiniteScroll.complete();
      },
      err => console.log(err));
  }
   /* ngAfterViewChecked(){
        this.searchBar.setFocus();
    }*/
}

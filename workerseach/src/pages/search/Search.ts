/*
 * create by hanzhendong 2016/11/27
 * */
import { Component,ViewChild,ElementRef } from '@angular/core';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { HttpService } from "../../http/http.Service";
import { DetailPage } from "./detail/Detail";
import { NavController } from "ionic-angular";
import { SanitizeHtmlPipe } from "../../app/utils/SanitizeHtmlPipe";
import { Pipe, PipeTransform, Renderer } from '@angular/core';
import { Content,Searchbar} from 'ionic-angular';


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
  @ViewChild(Content) content: Content;
  @ViewChild('searchbar') searchBar:Searchbar;
  constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService,public renderer: Renderer, public elementRef: ElementRef) {
    this.initializeItems();
    this.initia();
    antlinker.configTitle({
      type: "label",
      title: '学工查询',
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
//页面初始加载数据
  initializeItems() {
    this.http.postJSON({
      Router: ServelUrl.Url.WorkPageList,
      Method: 'POST',
      Body: {
        param: this.searchQuery,
        Page: this.Page,
        PageNo: this.PageNo,
      }
    }).then(
      comments => {
        this.items = comments.Data || [];
      });
  }
  initia(){
    localStorage.removeItem('searchQuery');
    console.log("初始页面");
  }
  
   ionViewDidEnter() {
         
          this.searchQuery = JSON.parse(localStorage.getItem('searchQuery'));
          console.log("this.searchQuery");
          console.log("chaxunneir");
          if(this.searchQuery){
          this.search(this.searchQuery); 
          console.log("返回内容查询");
        }
      }
        ionViewWillLeave() {
          localStorage.setItem('searchQuery', JSON.stringify(this.searchQuery));
          console.log("退出查询");
          
      }
  /*
   * 查询数据
   * */
  search($event) {
    // this.loading = this.HelpUtils.loadingPop();
     this.moreData = true;
    this.Page = 0;
    this.moreData = true;
    this.http.postJSON({
      Router: ServelUrl.Url.WorkPageList,
      Method: 'POST',
      Body: {
        // param: $event.target.value || '',
        param:this.searchQuery ||'',
        Page: this.Page,
        PageNo: this.PageNo,
      }
    }).then(
      comments => {
        this.items = comments.Data || [];
        this.content.scrollToTop();
        // this.loading.dismiss();
      },
      err => console.log(err));
  }

   /*
   * 跳转
   * */
  NavigationTo(chat) {
         this.navCtrl.push(DetailPage, {'chat': chat});
        }
  /*
   * 上拉刷新
   * */
  doRefresh(refresher) {
    this.moreData = true;
    this.http.postObserJSON({     
      Router: ServelUrl.Url.WorkPageList,
      Method: 'POST',
      Body: {
        param:this.searchQuery||'',
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
   * 打电话
   * */
  callPhone(params) {
    this.HelpUtils.callUp(params)
  }

  /*
   * 下拉加载
   * */
  doInfinite(infiniteScroll) {
    this.Page++;
    this.http.postJSON({
      Router: ServelUrl.Url.WorkPageList,
      Method: 'POST',
      Body: {
        param:this.searchQuery||'',
        Page: this.Page,
        PageNo: this.PageNo,
      }
    }).then(
      comments => {
        if (comments.Data) {
          this.moreData = true;
          this.items = this.items.concat(comments.Data);
        } else  {
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

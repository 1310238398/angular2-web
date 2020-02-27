import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from '../../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
    selector: 'page-parklist',
    templateUrl: 'parklist.html'
})
export class ParkListPage {

    QRcode = ''; //二维码CODE
    itemsObj = []; //园区或者楼号列表数据
    isPark = true;  //true 园区数据  false 楼号数据
    titleTxt = '';  //请选择园区   请选择楼号
    parkName = '';   //园区名称  只有为宿舍楼数据才显示
    
    Page: number = 1;
    moreData: boolean = true;
    PageNo: number = 20;
    loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public helpUtil: HelpUtils, private http: HttpService) { }

    ionViewWillEnter() {
        antlinker.configTitle({
            type: "label",
            title: '二维码绑定',
            fail: function () { },
            success: function () { }
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () { },
            success: function () { },
            trigger: function () { }
        });

    }
    ionViewDidEnter() {
        this.queryParkOrFloor();
    }
    //获取园区   或者  楼号
    queryParkOrFloor() {
        this.http.postJSON({
            Router: ServelUrl.Url.getdistrict,
            Method: 'POST',
            Body: {
                pageindex:this.Page,
                pagesize:this.PageNo,
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                if(res.data.type == 'district'){
                    this.isPark = true; //园区
                }else{
                    this.isPark = false;  //楼号
                    this.parkName = res.data.title;
                }
                this.itemsObj = res.data.items;
            } else {
                this.helpUtil.toastPop(res.FeedbackText);
            }
        },
            err => console.log(err)
        );
    }
    //下拉加载
    doInfinite(infiniteScroll) {
        this.Page++
        this.http.postJSON({
            Router: ServelUrl.Url.getdistrict,
            Method: 'POST',
            Body: {
                pageindex: this.Page,
                pagesize: this.PageNo
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                if (res.data != null && res.data.items.length > 0) {
                    this.moreData = true;
                    this.itemsObj = this.itemsObj.concat(res.data.items);
                } else {
                    this.moreData = false;
                }
                infiniteScroll.complete();
            } else {
                err => console.log(err)
            }
        });
    }
    //跳转楼
    gotoFloor(item1,item2) {
        this.navCtrl.push('FloorListPage',{code:item1,name:item2})
    }
    //页面跳转单元
    gotoUnit(item) {
        this.navCtrl.push('UnitListPage',{code:item})
    }









}
import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from '../../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
    selector: 'page-floorlist',
    templateUrl: 'floorlist.html'
})
export class FloorListPage {

    QRcode = ''; //二维码CODE
    itemsObj = [];

    parkCode = '';
    parkName = '';  //园区名称 
    
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

        this.parkCode = this.navParams.get('code');
        this.parkName = this.navParams.get('name');
    }

    ionViewDidEnter() {
        this.queryParkOrFloor();
    }
    //获取楼号
    queryParkOrFloor() {
        this.http.postJSON({
            Router: ServelUrl.Url.getdormitory,
            Method: 'POST',
            Body: {
                district: this.parkCode,
                pageindex: this.Page,
                pagesize: this.PageNo
            }
        }).then(res => {
            if (!res.FeedbackCode) {
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
            Router: ServelUrl.Url.getdormitory,
            Method: 'POST',
            Body: {
                district: this.parkCode,
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

    //页面跳转
    gotoUnit(item) {
        this.navCtrl.push('UnitListPage',{code:item})
    }
}
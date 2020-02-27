
import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from '../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()

@Component({
    selector: 'page-floorlist',
    templateUrl: 'floorlist.html'
})
export class FloorListPage {

    sexInfo = '';
    itemsObj = [];

    Page: number = 1;
    moreData: boolean = true;
    PageNo: number = 20;
    loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public helpUtil: HelpUtils, private http: HttpService) { }

    ionViewWillEnter() {
        antlinker.configTitle({
            type: "label",
            title: '宿舍登记',
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

        this.sexInfo = JSON.parse(sessionStorage.getItem('sexInfo'));
    }

    ionViewDidEnter() {
        this.queryFloor();
    }

    //获取楼号
    queryFloor() {
        this.http.postJSON({
            Router: ServelUrl.Url.getdormitorydata,
            Method: 'POST',
            Body: {
                sex: this.sexInfo,
                pageindex: 1,
                pagesize: this.PageNo
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.itemsObj = res.Data.items;
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
            Router: ServelUrl.Url.getdormitorydata,
            Method: 'POST',
            Body: {
                sex: this.sexInfo,
                pageindex: this.Page,
                pagesize: this.PageNo
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null && res.Data.items.length > 0) {
                    this.moreData = true;
                    this.itemsObj = this.itemsObj.concat(res.Data.items);
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
    gotoRoom(item) {
        sessionStorage.setItem('dormitorycode', JSON.stringify(item));   //楼CODE
        this.navCtrl.push('RoomListPage')
    }



}
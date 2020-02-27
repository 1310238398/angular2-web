import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from '../../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
    selector: 'page-unitlist',
    templateUrl: 'unitlist.html'
})
export class UnitListPage {

    QRcode = ''; //二维码CODE
    itemsObj = [];

    floorCode = '';  //宿舍楼Code
    isUnit = true;  //true 单元数据  false 宿舍数据
    titleTxt = '';  //请选择单元   请选择宿舍
    parkName = '';    //园区 楼  单元名称

    Page: number = 1;
    moreData: boolean = true;
    PageNo: number = 20;
    loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public helpUtil: HelpUtils, private http: HttpService, public alertCtrl: AlertController) { }

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
        this.floorCode = this.navParams.get('code');
        this.QRcode = JSON.parse(sessionStorage.getItem('QRcode'));
    }
    ionViewDidEnter() {
        this.queryTopTitle();
        this.queryUnitOrRoom();
    }
    //获取顶部标题
    queryTopTitle() {
        this.http.postJSON({
            Router: ServelUrl.Url.gettoptitle,
            Method: 'POST',
            Body: {
                type: 'dormitory',
                code: this.floorCode
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.parkName = res.data.DistrictName + res.data.DormitoryName
            } else {
                this.helpUtil.toastPop(res.FeedbackText);
            }
        },
            err => console.log(err)
        );
    }
    //获取单元   或者  宿舍
    queryUnitOrRoom() {
        this.http.postJSON({
            Router: ServelUrl.Url.getunit,
            Method: 'POST',
            Body: {
                dormitory: this.floorCode,
                pageindex: this.Page,
                pagesize: this.PageNo
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                if (res.data.type == 'room') {
                    this.isUnit = false;  //宿舍
                    this.titleTxt = '请选择宿舍';

                } else {
                    this.isUnit = true; //单元
                    this.titleTxt = '请选择单元';
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
            Router: ServelUrl.Url.getunit,
            Method: 'POST',
            Body: {
                dormitory: this.floorCode,
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

    //跳转宿舍页
    gotoRoomPage(item) {
        this.navCtrl.push('RoomListPage', { code: item })
    }

    //绑定二维码
    bindCode(obj1, obj2) {
        const prompt = this.alertCtrl.create({
            title: '',
            message: '<p>确定要将该二维码与 </p>' + '<p>"' + this.parkName + obj2 + '宿舍"</p>' + '<p>绑定吗？</p>',
            buttons: [
                {
                    text: '取消',
                    handler: data => { }
                },
                {
                    text: '确定',
                    handler: data => {
                        this.http.postJSON({
                            Router: ServelUrl.Url.bindqrcodetoroom,
                            Method: 'POST',
                            Body: {
                                qrcode: this.QRcode,
                                roomcode: obj1,
                                roomname: this.parkName + obj2
                            }
                        }).then(res => {
                            if (!res.FeedbackCode) {
                                this.helpUtil.toastPopTop('绑定成功');

                                setTimeout(function () {
                                    antlinker.closeView({
                                        success: function () {
                                        },
                                        fail: function () {
                                        }
                                    });
                                }, 1200);
                            } else {
                                this.helpUtil.toastPopTop(res.FeedbackText);
                            }
                        },
                            err => console.log(err)
                        );
                    }
                }
            ]
        });
        prompt.present();
    }


}
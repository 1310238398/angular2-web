import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { HttpService } from "../../http/http.Service";
import { ServelUrl } from "../../app/ServelUrl";


declare var antlinker;

@IonicPage()
@Component({
    selector: 'promisebooktwo',
    templateUrl: 'promisebooktwo.html'
})
export class PromiseBookTwoPage {

    itemsSrc = '';
    nowTime = ''

    commitmentID = '';
    signature = '';
    isDrawing = false;
    show = false;
    // loadSuccess = false;
    signaturePadOptions: any = { // Check out https://github.com/szimek/signature_pad
        minWidth: 2,
        canvasWidth: 100,
        canvasHeight: 100,
        backgroundColor: '#ffffff',
        penColor: '#3e3e3e',
        placeholder: '请签字'
    };

    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    constructor(public navCtrl: NavController, private http: HttpService) { }


    ionViewWillEnter(): void {
        antlinker.configTitle({
            type: "label",
            title: "请签字",
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

        window.addEventListener('resize', () => {

            setTimeout(() => {
                this.signaturePad.resizeCanvas();
            }, 1000)
            this.signaturePad.resizeCanvas();
        });
        antlinker.changeOrientation({
            orientation: 'landscape',
            success: () => {

            },
            fail: function () {
                // jssdk失败
            }
        })
    }

    ionViewDidLeave() {
        antlinker.changeOrientation({
            orientation: 'portrait',
            success: () => {
                console.log("竖屏 portrait");
            },
            fail: function () {
                // jssdk失败
            }
        })
    }

    // ngAfterViewInit(): void {
    //     this.signaturePad.resizeCanvas();
    // }

    drawComplete() {
        // this.isDrawing = false;
    }

    drawStart() {
        this.isDrawing = true;
    }

    // 签署
    savePad() {
        this.signature = this.signaturePad.toDataURL();

        this.http.postJSON({
            Router: ServelUrl.Url.saveattach,
            Method: 'POST',
            Body: {
                BizType: 'StudentNeedSupportSign',
                AttachmentItemName: '',
                AttachmentItemType: '',
                AttachmentItemSize: '',
                AttachmentURL: '',
                Base64: this.signature,
            }
        }).then(
            data => {
                if (!data.FeedbackCode) {

                    antlinker.changeOrientation({
                        orientation: 'portrait',
                        success: function () {
                            //jssdk成功

                        },
                        fail: function () {
                            // jssdk失败
                        }
                    })
                    this.navCtrl.push('PromiseBookOnePage', {
                        bTest: "1"
                    });



                }
            },
            err => alert(err)
        );
    }

    clearPad() {
        this.signaturePad.clear();
        this.isDrawing = false;
    }
























    //查询数据
    // search() {
    //   this.http.postJSON({
    //     Router: ServelUrl.Url.getsign,
    //     Method: 'POST',
    //     Body: {
    //     }
    //   }).then(
    //     data => {
    //       this.itemsSrc = data.Data.AttachmentURL || [];
    //     },
    //     err => console.log(err));
    // }






    // //跳转申请所需资料详情页
    // NavtoIndex() {
    //   this.navCtrl.push('IndexPage');
    // }


    //this.search();

    // const Dates = new Date();
    // const year: number = Dates.getFullYear();
    // const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    // const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    // this.nowTime =  year + '年' + month + '月' + day + '日'

}

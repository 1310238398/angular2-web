import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { PromiseService } from '../promise.servise';

import { StuDetailPage } from './detail';

// import { PromiseBookMy } from '../promise';

@Component({
    selector: 'stu-sign',
    templateUrl: 'sign.html',
    providers: [ScreenOrientation]
})
export class StuSignPage {
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
    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private promiseServise: PromiseService,
        private screenOrientation: ScreenOrientation
    ) {
        this.commitmentID = this.navParams.get('commitid');
    }



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
        // antlinker.configNavigationButton({
        //     type: ['more'],
        //     moreOption: ["refresh"],
        //     success: function () {
        //         //设置右上角按钮成功
        //     },
        //     fail: function () {
        //         // 设置右上角按钮失败
        //     },
        //     trigger: function () {
        //         //点击标题时调用
        //     }
        // });
        console.log('initclientWidth' + document.body.clientWidth);
        console.log('initclientHeight' + document.body.clientHeight);
        console.log('initavailHeight' + window.screen.availHeight);
        console.log('initavailWidth' + window.screen.availWidth);
        console.log('initheight' + window.screen.height);
        console.log('initwidth' + window.screen.width);
        window.addEventListener('resize', () => {
            console.log('initclientWidth' + document.body.clientWidth);
            console.log('initclientHeight' + document.body.clientHeight);
            console.log('availHeight' + window.screen.availHeight);
            console.log('availWidth' + window.screen.availWidth);
            console.log('height' + window.screen.height);
            console.log('width' + window.screen.width);

            //this.signaturePad.set('canvasHeight', document.body.clientHeight - 30);
            //this.signaturePad.set('canvasWidth', document.body.clientWidth - 30);
            setTimeout(() => {

                this.signaturePad.resizeCanvas();
                console.log('clientWidth' + document.body.clientWidth);
                console.log('clientHeight' + document.body.clientHeight);
                console.log('availHeight' + window.screen.availHeight);
                console.log('availWidth' + window.screen.availWidth);
                console.log('height' + window.screen.height);
                console.log('width' + window.screen.width);
            }, 1000)
            this.signaturePad.resizeCanvas();
            console.log('clientWidth' + document.body.clientWidth);
            console.log('clientHeight' + document.body.clientHeight);
            console.log('availHeight' + window.screen.availHeight);
            console.log('availWidth' + window.screen.availWidth);
            console.log('height' + window.screen.height);
            console.log('width' + window.screen.width);

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
        this.promiseServise.signature(this.commitmentID, this.signature).then(res => {
            if (res.RE === 0) {
                antlinker.changeOrientation({
                    orientation: 'portrait',
                    success: function () {
                        //jssdk成功

                    },
                    fail: function () {
                        // jssdk失败
                    }
                })
                this.navCtrl.push(StuDetailPage, { commitid: this.commitmentID,back:true });
                this.signaturePad.clear();
            }
        });

    }

    clearPad() {
        this.signaturePad.clear();
        this.isDrawing = false;
    }
}
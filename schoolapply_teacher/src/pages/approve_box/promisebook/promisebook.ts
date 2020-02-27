import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { HttpService } from "../../../http/http.Service";
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
    selector: 'promisebook',
    templateUrl: 'promisebook.html'
})
export class PromiseBookPage {

    dataObj = {
        flow_code: "",
        flow_id: "",
        flow_name: "",
        form_data: "",
        form_type: "",
        id: 0,
        input_data: {
            AcademyCode: "",
            AcademyName: "",
            CounselorData: [],
            FocusData: [],
            GradeNames: "",
            GradesData: [],
            HardCommon: "",
            HardNormal: "",
            HardSeries: "",
            NeedSupportStudentTotal: "",
            StudentTotal: "",
            TaskID: "",
            TaskType: "",
            action: "",
            status: "",
            statustxt: "",
            timestart: "",
            title: "",
            imagesId: '',
            remarktxt: ''
        },
        is_back: false,
        launch_time: "",
        launcher: "",
        launcher_name: "",
        node_instance_id: "",
        out_data: "",
        processor: "",
        processor_name: "",
        processor_time: "",
        record_id: "",
        status: 1,
        status_text: "",
        title: "",
    };

    imagesId = '';  //图片存储ID

    signature = '';
    isDrawing = false;

    signaturePadOptions: any = { // Check out https://github.com/szimek/signature_pad
        minWidth: 2,
        canvasWidth: 100,
        canvasHeight: 100,
        backgroundColor: '#ffffff',
        penColor: '#3e3e3e',
        placeholder: '请签字'
    };

    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    constructor(public navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils) { }

    ionViewWillEnter(): void {
        antlinker.configTitle({
            type: "label",
            title: "请签字",
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
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.signaturePad.resizeCanvas();
            }, 1000)
            this.signaturePad.resizeCanvas();
        });
        antlinker.changeOrientation({
            orientation: 'landscape',
            success: () => { },
            fail: function () { }
        })

        this.dataObj = JSON.parse(sessionStorage.getItem('dataPass'));
    }
    //离开页面程序
    ionViewDidLeave() {
        antlinker.changeOrientation({
            orientation: 'portrait',
            success: () => {
                console.log("竖屏 portrait");
            },
            fail: function () { }
        })
    }
    // 签署 发起工作流
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
                    this.imagesId = data.Data.RecordID;
                    this.markFlowMethod();
                }
            },
            err => console.log(err)
        );
    }
    //工作流处理流程
    markFlowMethod() {
        var fromdata = this.dataObj.input_data;
        if (this.dataObj.input_data['action'] == 'counsellor') {
            fromdata['action'] = "academicleader";
            fromdata['statustxt'] = "学院分管领导审批已通过";
            fromdata['academicImgId'] = this.imagesId;
        } else if (this.dataObj.input_data['action'] == 'academicleader') {
            fromdata['action'] = "schoolleader";
            fromdata['statustxt'] = "资助中心审批已通过";
            fromdata['schoolImgId'] = this.imagesId;
        }

        fromdata['status'] = "2";
        fromdata['istrue'] = "true";
        fromdata['remarktxt'] = '';


        this.http.postFLOW({
            Router: ServelUrl.Url.starthandle,
            Method: 'POST',
            Body: {
                record_id: this.dataObj.node_instance_id,
                form_data: JSON.stringify(fromdata)
            }
        }).then(res => {
            if (res == 'ok') {
                this.HelpUtils.toastPopTop('审批成功');

                const that = this;
                setTimeout(function () {

                    antlinker.changeOrientation({
                        orientation: 'portrait',
                        success: () => {
                            console.log("竖屏 portrait");
                        },
                        fail: function () { }
                    })
                    
                    that.navCtrl.push('IndexApprovePage');
                }, '1000');
            } else {
                this.HelpUtils.toastPopTop(res);
            }
        },
            err => console.log(err)
        );
    }
    //开始签名
    drawStart() {
        this.isDrawing = true;
    }
    //完成签名
    drawComplete() {
        // this.isDrawing = false;
    }
    //清空签名
    clearPad() {
        this.signaturePad.clear();
        this.isDrawing = false;
    }






}

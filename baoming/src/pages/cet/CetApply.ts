import { HttpService } from "../../http/http.Service";
import { Component } from "@angular/core";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { NavController } from "ionic-angular";
import { Declare } from "./declare/Declare";
import { ServelUrl } from "../../app/ServelUrl";
import { Apply } from "./apply/Apply";
/**
 * Created by hanzhendong on 2017/2/28.
 */
@Component({
    selector: 'page-CetApply',
    templateUrl: './CetApply.html'
})
export class CetApply {
    private types: Array<any>;
    private imgsrc;
    private Expand: boolean;
    private languageData: Array<any>;
    private CetApply: any = {
        ExamSubject: '',
        file: ''
    };

    constructor(private http: HttpService, private HelpUtils: HelpUtils, private navCtrl: NavController) {
        this.http.postJSON({
            Router: ServelUrl.Url.querycetlanguage,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.languageData = comments.Data;
                    this.languageData.map(item => {
                        item.isClick = false;
                    })
                    this.types = this.languageData.slice(0, 2);

                }
            });
    }

    ionViewDidEnter() {
        /**
         * 调用jssdk
         * 标题
         */
        antlinker.configTitle({
            type: "label",
            title: '报名',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configTitleButton({
            type: 'back',
            text: '关闭',
            fail: function () {

            },
            success: function () {
            },
            trigger: function () {
            }

        });
        /*  let cacheCetApply = JSON.parse(localStorage.getItem('CetApply'));
         this.CetApply.ExamSubject = cacheCetApply.ExamSubject;
         this.types.map(item => {
         if (item.Code == this.CetApply.ExamSubject.Code) {
         item.isClick = true;
         }
         });*/
    }

    setType(item) {
        this.languageData.map(item => {
            item.isClick = false;
        });
        item.isClick = true;
        this.CetApply.ExamSubject = item;
    }

    onMore() {
        this.Expand = !this.Expand;
        if (this.Expand) {
            this.types = this.types.concat(this.languageData.slice(2));
        } else {
            this.types.splice(2);
        }
    }

    /**
     * 详细
     */
    onCetDetail(): void {
        if (!this.CetApply.ExamSubject) {
            this.HelpUtils.toastPop('请选择报名类型！');
            return;
        }
        if (!this.CetApply.file) {
            this.HelpUtils.toastPop('请上传头像！');
            return;
        }
        if (this.CetApply.file.type != 'image/jpeg') {
            this.HelpUtils.toastPop('照片需为.jpg格式！');
            return;
        }
        if (this.CetApply.file.size / 1024 >= 500) {
            this.HelpUtils.toastPop('照片不大于500K！');
            return;
        }
        this.http.postJSON({
            Router: ServelUrl.Url.checkstudentcetsignupstatus,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    if (comments.Data == 3) {
                        this.navCtrl.push(Apply, {CetApply: this.CetApply});
                    } else {
                        this.HelpUtils.toastPop('您已提交过报名！');
                    }
                }
            });

    }

    onDeclare(): void {
        this.navCtrl.push(Declare);
    }

    uploadFile(event): void {
        if (event.target.files[0]) {
            this.CetApply.file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                /* var image = new Image();
                 image.onload = function () {
                 var width = image.width;
                 var height = image.height;
                 console.log(width + '======' + height + "=====");
                 };
                 image.src = reader.result;*/
                this.imgsrc = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }

    }
}

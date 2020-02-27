import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { InstructorPage } from "./InstructorPage";
import { OptPage } from "./OptPage";
declare var Swiper: any;
declare var antlinker;
@Component({
    selector: 'page-resumeleavedetail',
    templateUrl: 'InstructorList.html'
})
export class InstructorList implements OnInit {

    items: Array<any> = [];
    optPage = OptPage;
    counselors = {
        DepartmentName: "",
        IntelUserCode: "",
        IsDone: "",
        Name: "",
        UserCode: ""
    };
    IntelUserCode;

    ngOnInit(): void {

        new Swiper('.swiper-container', {
            centeredSlides: true,
            // 分页器
            pagination: '.swiper-pagination',
            observer: true,
            observeParents: true
        })
    }

    constructor(public navCtrl: NavController, private http: HttpService, public navParams: NavParams, ) { };

    ionViewWillEnter() {
        antlinker.configTitle({
            type: "label",
            title: '辅导员测评',
            fail: function () {

            },
            success: function () {
            }
        });

        this.getCounselors()
    }

    // 获取辅导员
    getCounselors() {
        this.http.postJSON({
            Router: ServelUrl.Url.queryquerycounselors,
            Method: 'POST',
            Body: {}
        }).then(res => {
            this.counselors = res.Data[0];
            this.getCounselorsDetail();
        })
    }

    //    获取辅导员详情
    getCounselorsDetail() {
        this.http.postJSON({
            Router: ServelUrl.Url.querycounselorinfo,
            Method: 'POST',
            Body: { 
                c_intelUserCode: this.counselors.IntelUserCode
            }
        }).then(comments => {
            if (!comments.FeedbackCode) {
                this.items = comments.Data;
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].Message == "") {
                        this.items[i].Message = "作为辅导员，最幸福的事情莫过于能与你们共同度过大学这段美好时光。新学期，我将与你们一路同行！加油"
                    }
                    if (this.items[i].URL == "") {
                        this.items[i].URL = "./assets/images/default@2x.png"
                    }
                }
            }
        });
    }



    NavigationTo(item) {
        if (item.IsDone == "1") {
            return;
        } else {
            item = { IntelUserCode: item.IntelUserCode, Name: item.Name };
            this.navCtrl.push(OptPage, { id: JSON.stringify(item) });
        }
    }
}
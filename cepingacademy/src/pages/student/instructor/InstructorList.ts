/**
 * Created by lizan on 17/2/10.
 */
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
    instructorPage = InstructorPage;
    IntelUserCode;

    usercode;
    ngOnInit(): void {

        new Swiper('.swiper-container', {
            centeredSlides: true,
            // 分页器
            pagination: '.swiper-pagination',
            observer: true,
            observeParents: true
        })
    }

    constructor(public navCtrl: NavController, private http: HttpService, public navParams: NavParams, ) {
        if(this.navParams.get('intelUserCode')){
            this.IntelUserCode = this.navParams.get('intelUserCode');
            localStorage.setItem('interusercode', this.IntelUserCode);
        }else{
            this.usercode =localStorage.getItem('intelUserCode');
        }       
        this.usercode = localStorage.getItem("interusercode");

        /**
         * 获取辅导员列表
         */
        this.http.postJSON({
            Router: ServelUrl.Url.querycounselorinfo,
            Method: 'POST',
            Body: { c_intelUserCode: this.usercode }
        }).then(
            comments => {
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

        antlinker.configTitle({
            type: "label",
            title: '辅导员测评',
            fail: function () {

            },
            success: function () {
            }
        });
    };


    NavigationTo(item) {
        if (item.IsDone == "1") {
            return;
        } else {
            item = { IntelUserCode: item.IntelUserCode, Name: item.Name };
            // this.navCtrl.push(InstructorPage, { id: JSON.stringify(item) });
            this.navCtrl.push(OptPage, { id: JSON.stringify(item) });
        }
    }
}
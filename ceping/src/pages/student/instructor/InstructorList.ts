/**
 * Created by lizan on 17/2/10.
 */
import { Component,OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { InstructorPage } from "./InstructorPage";
declare var Swiper: any;
@Component({
    selector: 'page-resumeleavedetail',
    templateUrl: 'InstructorList.html'
})
export class InstructorList implements OnInit{
    items: Array<any> = [];
    instructorPage = InstructorPage;
    ngOnInit(): void {

        new Swiper('.swiper-container', {
            centeredSlides: true,
            // 分页器
            pagination: '.swiper-pagination',
            observer:true,
            observeParents:true
        })
    }

    constructor(public navCtrl: NavController, private http: HttpService) {
        /**
         * 获取辅导员列表
         */
        this.http.postJSON({
            Router: ServelUrl.Url.querycounselorinfo,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    this.items = comments.Data;
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
        if(item.IsDone =="1"){
            return;
        }else {
            item = {IntelUserCode: item.IntelUserCode, Name: item.Name};
            this.navCtrl.push(InstructorPage, {id: JSON.stringify(item)});
        }
    }
}
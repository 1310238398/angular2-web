import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
    selector: 'app-whychange',
    templateUrl: './whychange.component.html',
    styleUrls: ['./whychange.component.css']
})
export class WhychangeComponent implements OnInit {

    IntelUserCode = '';  //ID

    constructor(public httpService: HttpService, private route: ActivatedRoute, ) { }

    @Input() IntelUid;

    ngOnInit(): void {
        this.IntelUserCode = this.IntelUid;
        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.approvalonemodify,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.dataSet =  res.Data;
                for(let i=0;i<res.Data.length;i++){
                    res.Data[i].Modify =  this.nowDay(res.Data[i].Modify)
                }
            }
        })
    }

 


    dataSet = []


    nowDay(obj){
        const Dates = new Date(obj*1000);
        const year: number = Dates.getFullYear();
        const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
    }







}




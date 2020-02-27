import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";

@Component({
    selector: 'app-whychange',
    templateUrl: './whychange.component.html',
    styleUrls: ['./whychange.component.css']
})
export class WhychangeComponent implements OnInit {

    dataSet = [];
    IntelUserCode = '';  //ID

    constructor(public httpService: HttpService) { }

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
                this.dataSet = res.Data;
            }
        })
    }
}




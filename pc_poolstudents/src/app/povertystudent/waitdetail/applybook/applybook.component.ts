import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";

declare var $: any

@Component({
    selector: 'app-applybook',
    templateUrl: './applybook.component.html',
    styleUrls: ['./applybook.component.css']
})
export class ApplyBookComponent implements OnInit {

    IntelUserCode = '';  //ID
    categray = ''; //分类

    imgArr1 = [];
    imgArr2 = [];
    imgArr3 = [];

    loadingHidden = true;

    t1:any

    constructor(public httpService: HttpService) { }

    @Input() IntelUid;

    ngOnInit(): void {
        this.IntelUserCode = this.IntelUid;
        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.approvaloneattach,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
                TaskId: ''
            }
        }).subscribe(res => {
            this.loadingHidden = false;
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    for (let i = 0; i < res.Data.length; i++) {
                        if (res.Data[i].Code == '9700001') {
                            this.imgArr1 = res.Data[i].Attachs;
                        } else if (res.Data[i].Code == '9700002') {
                            this.imgArr2 = res.Data[i].Attachs;
                        } else if (res.Data[i].Code == '9700003') {
                            this.imgArr3 = res.Data[i].Attachs;
                        }
                    }
                }
            }
        })
    }

    //点击查看大图
    viewBigImg(num) {
        if (num == '1') {
            $('#jq11').viewer();
        } else if (num == '2') {
            $('#jq22').viewer();
        } else if (num == '3') {
            $('#jq33').viewer();
        }
    }





}

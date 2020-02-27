import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";


@Component({
    selector: 'app-statuspass',
    templateUrl: './statuspass.component.html',
    styleUrls: ['./statuspass.component.css']
})
export class StatuspassComponent implements OnInit {

    IntelUserCode = '';  //ID

    dataSet = {
        Status: 1,
        RefuseReason: '',
        BgStyle1: 'assets/images/pass_b.png',
        BgStyle2: 'assets/images/pass_notg.png',
    }


    values = 50;


    constructor(public httpService: HttpService, private route: ActivatedRoute, private mgSrv: NzMessageService, private router: Router) { }

    @Input() IntelUid;

    ngOnInit(): void {
        this.IntelUserCode = this.IntelUid;
    }

    //提交
    onSearch() {

        if (this.dataSet.Status != 1) {
            if (this.dataSet.RefuseReason.trim() == '') {
                this.createMessage('error', '请填写拒绝原因');
                return false
            }
        }

        this.httpService.POST({
            Router: ServelUrl.Url.subapproval,
            Method: 'POST',
            Body: {
                IntelUserCode: this.IntelUserCode,
                Status: this.dataSet.Status,
                RefuseReason: this.dataSet.RefuseReason
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.createMessage('success', '提交成功')
                this.router.navigate(['poverty']);
            }
        })
    }

    //是否通过
    onoff(obj) {
        this.dataSet.Status = obj;
        if (obj == 1) {
            this.dataSet.BgStyle1 = 'assets/images/pass_b.png'
            this.dataSet.BgStyle2 = 'assets/images/pass_notg.png'
        } else {
            this.dataSet.BgStyle1 = 'assets/images/pass_g.png'
            this.dataSet.BgStyle2 = 'assets/images/pass_notb.png'
        }
    }

    //取消
    reset() {
        this.dataSet.Status = 1
        this.dataSet.BgStyle1 = 'assets/images/pass_b.png'
        this.dataSet.BgStyle2 = 'assets/images/pass_notg.png'
        this.dataSet.RefuseReason = ''
    }
    //备注框字数变化
    txtChange(value: string) {
        this.values = 50 - value.length
    }

    createMessage = (type, text) => {
        this.mgSrv.create(type, `${text}`);
    };

}

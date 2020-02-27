import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { ActivatedRoute, Params, Router } from "@angular/router";




@Component({
    selector: 'app-waitindex',
    templateUrl: './waitindex.component.html',
    styleUrls: ['./waitindex.component.scss']
})
export class WaitIndexComponent implements OnInit {

    dataSet = [];
    Activity = [];
    optiontype = []
    optiondepart = []
    optionstaff = []
    optionunion = []

    page = {
        Page: 1,
        PageSize: 40,
    };
    total = 0;
    Atotal = 0;
    searchObj = {
        UnionName: '',     //社团名称
        UnionType: '',     //类别
        StudentCode: '',   //负责人
        Department: '',    //挂靠单位
        StaffCode: '',     //指导教师
        Aname: '',         //活动名称
        Uname: '',         //所属社团
        fuzeCode: '',      //负责人2
        Sbtime: '',        //申请开始时间
        Setime: '',        //申请结束时间
        Pbtime: '',        //举办开始时间
        Petime: '',        //举办结束时间
    };
    isshow = 'zuzhi';


    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private route: ActivatedRoute, private router: Router, private confirmServ: NzModalService) { }


    ngOnInit(): void {
        this.onSearch();
        this.getUnionType();
        this.getDepart();
        this.getTeacher();


    }

    //重置
    resetForm(form) {
        form.reset();
    }


    //加载社团类别
    getUnionType() {

        this.httpService.postJSON({
            Router: ServelUrl.Url.getuniontype,
            Method: 'POST',
            Body: {

            }
        }).then(res => {
            if (!res.FeedbackCode) {

                this.optiontype = res.Data;
            }
        });
    }


    //获取数据列表
    onSearch(reload = false) {
        if (reload) {
            this.page.Page = 1
        }

        this.httpService.POST({
            Router: ServelUrl.Url.getshetaunlist,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page,
                PageSize: this.page.PageSize,
                Name: this.searchObj.UnionName,
                Type: this.searchObj.UnionType,
                Code: this.searchObj.StudentCode,
                Teacher: this.searchObj.StaffCode,
                Depart: this.searchObj.Department
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                console.log(res);
                this.dataSet = res.Data.Datas;
                this.total = parseInt(res.Data.Total);
                console.log('total', this.total);

            }
        })
    }

    //加载社团单位
    getDepart() {

        this.httpService.postJSON({
            Router: ServelUrl.Url.getdepart,
            Method: 'POST',
            Body: {

            }
        }).then(res => {
            if (!res.FeedbackCode) {

                this.optiondepart = res.Data;
            }
        });
    }

    //加载指导老师
    getTeacher() {

        this.httpService.postJSON({
            Router: ServelUrl.Url.getteacher,
            Method: 'POST',
            Body: {

            }
        }).then(res => {
            if (!res.FeedbackCode) {

                this.optionstaff = res.Data;
            }
        });
    }


    change() {
        this.isshow = 'zuzhi';
    }
    cardbodychange() {
        this.isshow = 'huodong';
        this.getallunionname();
        this.onAcSearch();
    }


    //加载社团类别
    getallunionname() {

        this.httpService.postJSON({
            Router: ServelUrl.Url.getallunionname,
            Method: 'POST',
            Body: {

            }
        }).then(res => {
            if (!res.FeedbackCode) {

                this.optionunion = res.Data;
            }
        });
    }


    //加载社团活动
    onAcSearch(reload = false) {
        if (reload) {
            this.page.Page = 1
        }

        if (this.searchObj.Sbtime) {
            var datesb = new Date((this.searchObj).Sbtime);
            var datesb_value = datesb.getFullYear() + '-' + (datesb.getMonth() + 1) + '-' + datesb.getDate();

        }
        if (this.searchObj.Setime) {
            var datese = new Date((this.searchObj).Setime);
            var datese_value = datese.getFullYear() + '-' + (datese.getMonth() + 1) + '-' + (datese.getDate() + 1);

        }

        if (this.searchObj.Pbtime) {
            var datepb = new Date((this.searchObj).Pbtime);
            var datepb_value = datepb.getFullYear() + '-' + (datepb.getMonth() + 1) + '-' + datepb.getDate();

        }
        if (this.searchObj.Petime) {
            var datepe = new Date((this.searchObj).Petime);
            var datepe_value = datepe.getFullYear() + '-' + (datepe.getMonth() + 1) + '-' + (datepe.getDate() + 1);

        }
        console.log(datepe_value);


        this.httpService.POST({
            Router: ServelUrl.Url.getallactivityinfo,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page,
                PageSize: this.page.PageSize,
                Aname: this.searchObj.Aname,
                Uname: this.searchObj.Uname,
                Code: this.searchObj.fuzeCode,
                Sbtime: datesb_value,
                Setime: datese_value,
                Pbtime: datepb_value,
                Petime: datepe_value
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {

                this.Activity = res.Data.Datas;
                this.Atotal = parseInt(res.Data.Total);

            }
        })
    }


    //提交活动总结状态改变
    unionstatusinsert(m) {
        console.log('提交活动总结');
        this.httpService.POST({
            Router: ServelUrl.Url.addunionsta,
            Method: 'POST',
            Body: {
                Code: m,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                console.log('unionstatusinsert success')
            }
        })

    }


    goorganize(data) {
        if (data.status == 5) {
            this.router.navigate(['shetuanactivity'], { queryParams: { UnionCode: data.UnionCode, StudentCode: data.StudentCode, ActivityCode: data.ActivityCode, shenpiStatus: 3, pos: 1 } })

        } else {
            this.router.navigate(['shetuanactivity'], { queryParams: { UnionCode: data.UnionCode, StudentCode: data.StudentCode, ActivityCode: data.ActivityCode, shenpiStatus: 2, pos: 1 } })

        }
    }

}

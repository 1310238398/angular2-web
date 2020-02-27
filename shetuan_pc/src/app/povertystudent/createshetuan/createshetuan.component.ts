import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router } from "@angular/router";




@Component({
    selector: 'app-createshetuan',
    templateUrl: './createshetuan.component.html',
    styleUrls: ['./createshetuan.component.css']
})
export class CreateShetuanComponent implements OnInit {

    validateForm: FormGroup;
    optiontype = []
    subStop = false;
    optiondepart = []
    optionlstaff = []
    optionstaff = []

    inputShe = {
        UnionName: '',           //社团名称
        UnionType: '',           //类别
        InsertDatetime: '',      //创建时间
        StudentCode: '',         //负责人学号
        StaffCode: '',           //指导教师
        Department: '',          //挂靠单位
        UnionInfo: '',           //社团简介
    };
    outshe = {
        IntelUserCode: '',       //负责人code
        StudentName: '',         //负责人姓名
    }

    constructor(private route: ActivatedRoute, public httpService: HttpService, private router: Router, private msgSrv: NzMessageService, private confirmServ: NzModalService, private fb: FormBuilder) {
        this.validateForm = this.fb.group({
            UnionName: ['', [this.nameValidator]],
            UnionType: [null],
            StudentCode: ['', [this.codeValidator]],
            StudentName: ['', [Validators.required]],
            StaffCode: [null],
            Department: [null],
            InsertDatetime: ['', [Validators.required]],
            UnionInfo: [''],
        });

        this.route.queryParams.subscribe(queryParams => {
            this.inputShe.UnionName = queryParams.Name;
            this.inputShe.UnionType = queryParams.Type;
            this.inputShe.Department = queryParams.Depart;
            this.inputShe.UnionInfo = queryParams.Info;
            if (queryParams.InTime) {
                this.inputShe.InsertDatetime = queryParams.InTime;
            }

        })

    }


    ngOnInit(): void {

        this.getUnionType();
        this.getDepart();
        this.getTeacher();

    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    submitForm = ($event, value) => {
        this.subStop = true;
        $event.preventDefault();
        if (!this.inputShe.UnionName) {
            this.msgSrv.error('提交失败，社团名称不能为空');
            this.subStop = false;
            return
        }
        if (!this.inputShe.UnionType) {
            this.msgSrv.error('提交失败，社团类别不能为空');
            this.subStop = false;
            return
        }
        if (!this.inputShe.InsertDatetime) {
            this.msgSrv.error('提交失败，时间不能为空');
            this.subStop = false;
            return
        }
        if (!this.inputShe.Department) {
            this.msgSrv.error('单位不能为空');
            this.subStop = false;
            return
        }

        if (!this.inputShe.UnionInfo) {
            this.msgSrv.error('简介不能为空');
            this.subStop = false;
            return
        }

        if (this.inputShe.UnionName.length > 30) {
            this.msgSrv.error('提交失败，社团名称最多输入30个字');
            this.subStop = false;
            return
        }


        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        this.gotoshetuan();

        this.httpService.postJSON({
            Router: ServelUrl.Url.addshetuan,
            Method: 'POST',
            Body: {
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('创建成功');
                const that = this;
                setTimeout(function () {
                    that.router.navigate([''])
                    // that.subStop = true;
                }, 1000);
            } else {
                this.subStop = false;
            }
        });

    }

    nameValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true }
        } else if ((control.value).length > 30) {
            return { expired: true, error: true };
        }
    }

    codeValidator = (control: FormControl): { [s: string]: boolean } => {
        const CODE_REGEXP = /^[0-9a-zA-Z-]+$/;
        if (!control.value) {
            return { required: true }
        } else if (!CODE_REGEXP.test(control.value)) {
            return { expired: true, error: true };
        }
    }

    _disabledDate(current: Date): boolean {
        return current && new Date(current).getTime() > Date.now();
    }

    infoValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            if (control.value) {
                if ((control.value).length > 100) {
                    observer.next({ expired: true, error: true });
                }
            }
            observer.complete();
        })
    }

    // searchChange(searchText) {
    //    console.log(searchText);
    //    this.optionlstaff = this.optionstaff.filter(item => item.Name == searchText);
    // }

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


    //创建岗位
    gotoshetuan() {
        console.log(this.inputShe, date_value);

        if (this.inputShe.InsertDatetime) {
            var date = new Date((this.inputShe).InsertDatetime);
            var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        }
        this.router.navigate(['goshetuan'], {
            queryParams: {
                Name: this.inputShe.UnionName,                     // 社团名称
                Type: this.inputShe.UnionType,                     // 类别
                Time: date_value,                                  // 创建时间
                InTime: this.inputShe.InsertDatetime,              // 创建时间
                Depart: this.inputShe.Department,                  // 单位
                Info: this.inputShe.UnionInfo,                     // 简介
            }
        });

    }




}









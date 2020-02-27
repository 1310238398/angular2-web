import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router } from "@angular/router";




@Component({
    selector: 'app-gotoshetuan',
    templateUrl: './gotoshetuan.component.html',
    styleUrls: ['./gotoshetuan.component.css']
})
export class GoToShetuanComponent implements OnInit {

    validateForm: FormGroup;
    optiontype = []
    subStop = false;
    optiondepart = []
    optionlstaff = []
    optionstaff = []
    optionteacherwork = []

    inputShe = {
        StudentCode: '',         //负责人学号
        StaffCode: '',           //指导教师
        xname: '',          //名称
        teacherwork: '',
    };

    Name: '';           //社团名称
    Type: '';           //类别
    Depart: '';          //挂靠单位
    Info: '';           //社团简介
    Time;
    InTime;


    outshe = {
        IntelUserCode: '',       //负责人code
        StudentName: '',         //负责人姓名
    }

    MemberCode = {
        Member: ''
    }//从社团列表取出的

    constructor(private route: ActivatedRoute, public httpService: HttpService, private router: Router, private msgSrv: NzMessageService, private confirmServ: NzModalService, private fb: FormBuilder) {
        this.validateForm = this.fb.group({
            UnionName: ['', [this.nameValidator]],
            UnionType: [null],
            StudentCode: ['', [this.codeValidator]],
            StudentName: ['', [Validators.required]],
            StaffCode: [null],
            Department: [null],
            InsertDatetime: ['', [Validators.required]],
            UnionInfo: ['', '', [this.infoValidator]],
            xname: ['', [this.nameValidator]],
            teacherwork: [null]

        });
        this.route.queryParams.subscribe(queryParams => {
            this.Name = queryParams.Name;
            this.Type = queryParams.Type;
            this.Time = queryParams.Time;
            this.Depart = queryParams.Depart;
            this.Info = queryParams.Info;
            this.InTime = queryParams.InTime;


        })
    }


    ngOnInit(): void {

        this.teacherworkinfo();

    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    submitForm = ($event, value) => {
        this.subStop = true;
        $event.preventDefault();
        if (!this.outshe.IntelUserCode) {
            this.msgSrv.error('提交失败，失败原因可能负责人学号与姓名不符');
            this.subStop = false;
            return
        }
        if (!this.MemberCode.Member) {
            this.msgSrv.error('提交失败，老师与工作单位不一致！');
            this.subStop = false;
            return
        }

        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }

        this.httpService.postJSON({
            Router: ServelUrl.Url.addshetuan,
            Method: 'POST',
            Body: {
                Name: this.Name,                     // 社团名称
                Type: this.Type,                     // 类别
                Time: this.Time,                                  // 创建时间
                Code: this.outshe.IntelUserCode,                   // 学号
                Teacher: this.MemberCode.Member,                  // 老师
                Depart: this.Depart,                  // 单位
                Info: this.Info,                     // 简介
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('创建成功');
                const that = this;
                setTimeout(function () {
                    that.router.navigate([''])
                }, 1000);
            } else {
                this.subStop = false;
            }
        });

    }




    check(value) {
        console.log(1);
        if (!this.inputShe.StudentCode) {
            console.log('ttttt');
            return false;
        }
        console.log('sssss', value);
        this.httpService.postJSON({
            Router: ServelUrl.Url.getstudentcode,
            Method: 'POST',
            Body: {
                Code: value                 // 学号
            }
        }).then(res => {
            if (!res.FeedbackCode && res.Data) {
                this.outshe = res.Data;
                console.log(this.outshe);
            } else {
                // this.msgSrv.warning('负责人学号与姓名不符');
                console.log(789);
                this.outshe.IntelUserCode = '';
                this.outshe.StudentName = '';

            }
        });

    }

    nameValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true }
        } else if ((control.value).length > 10) {
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


    teacherworkinfo() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.teacherworkinfo,
            Method: 'POST',
            Body: {

            }
        }).then(res => {
            if (!res.FeedbackCode) {

                this.optionteacherwork = res.Data;
            }
        });

    }

    tcheck(value) {
        if (!this.inputShe.teacherwork) {
            console.log('ttttt');
            return false;
        }

        this.httpService.postJSON({
            Router: ServelUrl.Url.getteacherintel,
            Method: 'POST',
            Body: {
                Code: this.inputShe.teacherwork,       // departmentcode
                Name: this.inputShe.xname,             // name         
            }
        }).then(res => {
            console.log(2);
            if (!res.FeedbackCode && res.Data) {
                this.MemberCode.Member = res.Data.IntelUserCode;
                console.log(this.MemberCode.Member);
            } else {
                this.MemberCode.Member = '';
                // this.msgSrv.warning('社团成员中查无此人');
            }
        });

    }


    //返回编辑页
    gocreate() {
        this.router.navigate(['shetuan'], {
            queryParams: {
                Name: this.Name,
                Type: this.Type,
                Depart: this.Depart,
                Info: this.Info,
                InTime: this.InTime,
            }
        });

    }





}









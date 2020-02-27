import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";

// import { StatisticsSevice } from './statistics.service';


declare const Viewer: any;
declare var $: any
@Component({
    templateUrl: './guanli.html',
    styleUrls: ['./guanli.scss']
})
export class GuanLiComponent implements OnInit {

    editRow = null;
    tempEditObject = {};
    validateForm: FormGroup;
    boy = 0;
    girl = 0;
    boycloth = [];
    boyfoot = [];
    girlcloth = [];
    girlfoot = [];
    isVisible = false;
    loading = false;
    isConfirmLoading = false;
    dataSet = [];
    daimaData = [
        {
            daimaName: '民族',
            daimaCode: 'Nationality'
        },
        {
            daimaName: '政治面貌',
            daimaCode: 'PoliticalFace'
        },
        {
            daimaName: '生源地',
            daimaCode: 'HouseholdCity'
        },
        {
            daimaName: '户籍地',
            daimaCode: 'HouseholdCountry'
        },
        {
            daimaName: '院系',
            daimaCode: 'Academy'
        },
        {
            daimaName: '班级',
            daimaCode: 'Class'
        },
        {
            daimaName: '专业',
            daimaCode: 'Major'
        },
        {
            daimaName: '性别',
            daimaCode: 'Sex'
        },

    ];

    inputShe = {
        daimatype: '',       //代码类别
        daima: '',           //代码
        maname: '',          //代码名称
    };

    gradeData = [];
    total = 0;
    page = {
        pageIndex: 1,
        PageSize: 20
    };

    search = {
        Daima: ''
    };
    isshow = 'renshe';
    constructor(
        public httpService: HttpService,
        private message: NzMessageService,
        private fb: FormBuilder
    ) {
        this.validateForm = this.fb.group({
            daimatype: ['', [Validators.required]],
            daima: ['', [this.codeValidator]],
            maname: ['', [this.nameValidator]],
            // ActivityInfo: ['', [this.infoValidator]]
        });

    }
    ngOnInit() {
        this.getAcademyList();
        this.GetMaBiaoList();
    }

    change() {
        this.isshow = 'renshe';
    }
    cardbodychange() {
        this.isshow = 'jiaoyu';
    }

    //获取当属社团详情
    GetMaBiaoList() {
        this.loading = true;
        let typecode = this.search.Daima ? this.search.Daima : '';
        this.httpService.POST({
            Router: ServelUrl.Url.mabiaolist,
            Method: 'POST',
            Body: {
                type: typecode,
                PageNum: this.page.pageIndex,
                PageSize: this.page.PageSize
            }
        }).subscribe(res => {
            this.loading = false;
            if (!res.FeedbackCode && res.Data.Datas) {
                this.dataSet = res.Data.Datas;
                this.total = parseInt(res.Data.Total);
                console.log(this.total);
            } else {
                this.dataSet = [];
                this.total = 0;
            }
        })
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }


    // 请求违纪列表
    getStatisticsList() {
        // this.loading = true;
        // let academyCode = this.search.Academy ? this.search.Academy.AcademyCode : '';
        // this.statisticsSevice.queryStatisticsList(academyCode, this.search.GradeName, this.pageIndex, this.pageSize).subscribe(res => {
        //     this.loading = false;
        //     if (res.Data.total && parseInt(res.Data.total, 10) > 0) {
        //         this.dataSet = res.Data.datas;
        //         this.total = parseInt(res.Data.total, 10);

        //     } else {
        //         this.dataSet = [];
        //         this.total = 0;
        //     }
        // });
    }

    // // 请求违纪列表
    // getStatisticsPageChange(page) {
    //     console.log('page' + page);
    //     if (!page || page === 0 || page === this.page.pageIndex) {
    //         return;
    //     }
    //     this.page.pageIndex = page;
    //     this.GetMaBiaoList();
    // }

    // 查询
    searchFunc(reload) {
        if (reload) {
            this.page.pageIndex = 1;
        }
        this.GetMaBiaoList();
    }

    // 重置
    reset() {

    }

    // 导出
    down() {
        // let academyCode = this.search.Academy ? this.search.Academy.AcademyCode : '';
        // this.statisticsSevice.down(academyCode, this.search.GradeName).subscribe(res => {
        //     if (res.Data.url) {
        //         window.location.href = res.Data.url;
        //     }
        // });

    }

    // 学院列表
    getAcademyList() {
        // this.statisticsSevice.queryAcademyList().subscribe(res => {
        //     res.Data && res.Data.length > 0 ? this.academyData = res.Data : this.academyData = [];
        // });
    }

    // 年级列表
    getGradeList() {
        // this.statisticsSevice.queryGradeList().subscribe(res => {
        //     res.Data && res.Data.length > 0 ? this.gradeData = res.Data : this.gradeData = [];
        //     if (this.gradeData.length > 0) {
        //         this.search.GradeName = this.gradeData[this.gradeData.length - 1].GradeName;
        //         this.getStatisticsList();
        //     }
        // });
    }

    // showModal(): void {
    //     let academyCode = this.search.Academy ? this.search.Academy.AcademyCode : '';
    //     this.statisticsSevice.queryStatisticsList(academyCode, this.search.GradeName, this.pageIndex, this.pageSize).subscribe(res => {
    //         if (res.Data.total && parseInt(res.Data.total, 10) > 0) {
    //             this.dataSet = res.Data.datas;
    //             this.total = parseInt(res.Data.total, 10);
    //             let staticData = res.Data.text;
    //             let cloth = staticData.cloth;
    //             let foot = staticData.foot;
    //             this.girl = 0;
    //             this.boy = 0;
    //             this.girlcloth = [];
    //             this.girlfoot = [];
    //             this.boycloth = [];
    //             this.boyfoot = [];
    //             cloth.forEach(element => {
    //                 if (element.SexName === '女') {
    //                     this.girlcloth.push(element);
    //                     // let girl = this.girl;
    //                     // let c = parseInt(element.C);
    //                     this.girl = this.girl + parseInt(element.C);
    //                 } else if (element.SexName === '男') {
    //                     this.boycloth.push(element);
    //                     // let boy = this.boy;
    //                     // let c = parseInt(element.C);
    //                     this.boy = this.boy + parseInt(element.C);
    //                 }
    //             });
    //             foot.forEach(element => {
    //                 if (element.SexName === '女') {
    //                     this.girlfoot.push(element);
    //                 } else if (element.SexName === '男') {
    //                     this.boyfoot.push(element);
    //                 }
    //             });
    //         } else {
    //             this.dataSet = [];
    //             this.total = 0;
    //             this.girl = 0;
    //             this.boy = 0;
    //             this.girlcloth = [];
    //             this.girlfoot = [];
    //             this.boycloth = [];
    //             this.boyfoot = [];
    //         }
    //         this.isVisible = true;
    //     });
    // }


    edit(data) {
        console.log(88);
        this.tempEditObject[data.Code] = { ...data };
        console.log(this.tempEditObject[data.Code]);
        this.editRow = data.Code;

    }

    save(data) {
        let Scode = data.Code;
        Object.assign(data, this.tempEditObject[data.Code]);
        this.editRow = null;

        this.httpService.POST({
            Router: ServelUrl.Url.updatemabiao,
            Method: 'POST',
            Body: {
                Scode: Scode,
                Code: data.Code,
                CodeName: data.CodeName,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.message.success('保存成功');
                this.GetMaBiaoList();

            }
        })

    }

    cancel(data) {
        this.tempEditObject[data.Code] = {};
        this.editRow = null;
    }

    delete(data, index) {
        this.dataSet.splice(index, 1);

        this.httpService.POST({
            Router: ServelUrl.Url.demabiao,
            Method: 'POST',
            Body: {
                Code: data.Code,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                console.log(2);
                this.message.success('删除成功');
            }
        })

    }


    showModal = () => {
        this.isVisible = true;
    }

    handleOk = (e) => {
        this.isConfirmLoading = true;

        if (!this.inputShe.daimatype) {
            this.message.error('提交失败，请选择代码类型');
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.validateForm.reset();
            return
        }

        if (!this.inputShe.daima) {
            this.message.error('提交失败，请填写代码');
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.validateForm.reset();
            return
        }

        if (!this.inputShe.maname) {
            this.message.error('提交失败，请填写代码名称');
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.validateForm.reset();
            return
        }

        this.httpService.POST({
            Router: ServelUrl.Url.addmabiao,
            Method: 'POST',
            Body: {
                Code: this.inputShe.daima,
                Type: this.inputShe.daimatype,
                Name: this.inputShe.maname
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.message.success('提交成功');
                this.GetMaBiaoList();
                this.isVisible = false;
                this.isConfirmLoading = false;
            }
        })
        this.validateForm.reset();
    }

    handleCancel = (e) => {
        this.isVisible = false;
        this.validateForm.reset();
    }

    nameValidator = (control: FormControl): { [s: string]: boolean } => {
        const CODE_REGEXP = /^[\u4e00-\u9fa5]+$/;
        if (!control.value) {
            return { required: true }
        } else if (!CODE_REGEXP.test(control.value)) {
            return { expired: true, error: true };
        }
    }

    codeValidator = (control: FormControl): { [s: string]: boolean } => {
        const CODE_REGEXP = /^[0-9]*$/;
        if (!control.value) {
            return { required: true }
        } else if (!CODE_REGEXP.test(control.value)) {
            return { expired: true, error: true };
        }
    }

}
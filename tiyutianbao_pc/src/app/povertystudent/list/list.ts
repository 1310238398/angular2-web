import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { StatisticsSevice } from './statistics.service';


declare const Viewer: any;
declare var $: any
@Component({
    templateUrl: './list.html',
    styleUrls: ['./list.scss']
})
export class ListComponent implements OnInit {
    editRow = null;
    tempEditObject = {};
    boy = 0;
    girl = 0;
    boycloth = [];
    boyfoot = [];
    girlcloth = [];
    girlfoot = [];
    isVisible = false;
    loading = false;
    dataSet = [];
    academyData = [];
    gradeData = [];
    total: number;
    page = {
        pageIndex: 1,
        PageSize: 40
    };
    daimaData = [
        {
            daimaName: '已填写',
            daimaCode: 1
        },
        {
            daimaName: '未填写',
            daimaCode: 0
        }

    ];

    search = {
        Daima: 1
    };

    isshow = 'renshe';
    constructor(
        public httpService: HttpService,
        private message: NzMessageService,
        private statisticsSevice: StatisticsSevice
    ) { }
    ngOnInit() {
        this.Gethumansociety();
    }

    change() {
        this.isshow = 'renshe';
    }
    cardbodychange() {
        this.isshow = 'jiaoyu';
    }



    //获取当属社团详情
    Gethumansociety() {
        this.loading = true;
        console.log(this.search.Daima);
        // let typecode = this.search.Daima ? this.search.Daima : 1;
        // console.log(typecode);
        this.httpService.POST({
            Router: ServelUrl.Url.humansociety,
            Method: 'POST',
            Body: {
                type: this.search.Daima,
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


    // 查询
    searchFunc(reload) {
        if (reload) {
            this.page.pageIndex = 1;
        }
        console.log(this.search.Daima);
        this.Gethumansociety();
    }

    // 重置
    reset() {

    }

    // 导出
    down() {
        console.log('sssrtt'+Number(this.search.Daima));
        // this.statisticsSevice.down(writestatus).subscribe(res => {
        //     if (res.Data.url) {
        //         window.location.href = res.Data.url;
        //     }
        // });
        this.httpService.POST({
            Router: ServelUrl.Url.down,
            Method: 'POST',
            Body: {
                Status: Number(this.search.Daima),
            }
        }).subscribe(res => {
            if (res.Data.url) {
                window.location.href = res.Data.url;
            }
        })


    }


    handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }

    edit(data) {
        console.log(88);
        this.tempEditObject[data.IntelUserCode] = { ...data };
        console.log(this.tempEditObject[data.IntelUserCode]);
        this.editRow = data.IntelUserCode;

    }

    save(data) {
        let Scode = data.Code;
        // if (!this.tempEditObject[data.IntelUserCode].Birthday) {
        //     return
        //   }

        Object.assign(data, this.tempEditObject[data.IntelUserCode]);
        this.editRow = null;


        var dateBirthday = new Date(data.Birthday);
        var Birthday = dateBirthday.getFullYear() + '-' + (dateBirthday.getMonth() + 1) + '-' + dateBirthday.getDate();

        var dateAdmissionTime = new Date(data.AdmissionTime);
        var AdmissionTime = dateAdmissionTime.getFullYear() + '-' + (dateAdmissionTime.getMonth() + 1) + '-01';
        console.log(AdmissionTime);

        var dateGraduationTime = new Date(data.GraduationTime);
        var GraduationTime = dateGraduationTime.getFullYear() + '-' + (dateGraduationTime.getMonth() + 1) + '-' + dateGraduationTime.getDate();

        var dateHouseholdRegistrationDate = new Date(data.HouseholdRegistrationDate);
        var HouseholdRegistrationDate = dateHouseholdRegistrationDate.getFullYear() + '-' + (dateHouseholdRegistrationDate.getMonth() + 1) + '-' + dateHouseholdRegistrationDate.getDate();


        this.httpService.POST({
            Router: ServelUrl.Url.updatehumansociety,
            Method: 'POST',
            Body: {
                Code: data.IntelUserCode,
                UserCode: data.UserCode,
                CandidateCode: data.CandidateCode,
                Name: data.Name,
                Sex: data.Sex,
                Nationality: data.Nationality,
                IdentityNum: data.IdentityNum,
                Education: data.Education,
                Major: data.Major,
                TrainingMethod: data.TrainingMethod,
                SourceLocationCode: data.SourceLocationCode,
                SchoolSystem: data.SchoolSystem,
                Minor: data.Minor,
                Birthday: Birthday,
                Bachelor: data.Bachelor,
                MajorForeignLanguage: data.MajorForeignLanguage,
                ForeignLanguageLevel: data.ForeignLanguageLevel,
                ComputerLevel: data.ComputerLevel,
                AdmissionTime: AdmissionTime,
                GraduationTime: GraduationTime,
                CommissioningUnit: data.CommissioningUnit,
                CommissioningLocation: data.CommissioningLocation,
                UniversityCode: data.UniversityCode,
                AdmissionMethod: data.AdmissionMethod,
                Academy: data.Academy,
                Class: data.Class,
                Extension1: data.Extension1,
                HouseholdRegistration: data.HouseholdRegistration,
                ProfessionalQualification: data.ProfessionalQualification,
                PoliticalFace: data.PoliticalFace,
                Extension2: data.Extension2,
                Extension3: data.Extension3,
                Extension4: data.Extension4,
                Extension5: data.Extension5,
                Extension6: data.Extension6,
                Remarks: data.Remarks,
                ResidentAddress: data.ResidentAddress,
                HouseholdCityCode: data.HouseholdCityCode,
                HouseholdCountryCode: data.HouseholdCountryCode,
                HouseholdDescription: data.HouseholdDescription,
                HouseholdHouseNumber: data.HouseholdHouseNumber,
                HouseholdRegistrationDate: HouseholdRegistrationDate,
                Phone: data.Phone,
                ProfessionalDirection: data.ProfessionalDirection,
                WeChat: data.WeChat
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.message.success('保存成功');
                this.Gethumansociety();

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


}
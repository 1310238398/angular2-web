import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { NzMessageService, } from "ng-zorro-antd";
import { ServelUrl } from "../../ServelUrl";

@Component({
    selector: 'app-searchindex',
    templateUrl: './searchindex.component.html',
    styleUrls: ['./searchindex.component.css']
})
export class SearchIndexComponent implements OnInit {
    dataSet = [];  //页面数据
    academyOption = [];    //学院
    majorOption = [];      //专业
    gradeOption = [];      //年级
    classOption = [];      //班级
    sexOption = [];         //性别
    nationOption = [];      //民族
    polityOption = [];      //政治面貌
    beginOption = [];      //入学时间
    endOption = [];         //毕业时间
    provinceOption = [];      //省
    cityOption = [];        //市
    countyOption = [];      //县
    ranksOption = [];      //困难等级
    typeOption = [];      //认定类型
    displayCheckbox = []; //学生情况筛选 复选框
    //学生基础数据展示  ---弹框选择
    basicDisplayBox = [
        { label: '学院', value: '0', checked: true },
        { label: '专业', value: '1', checked: true },
        { label: '班级', value: '2', checked: true },
        { label: '性别', value: '3', checked: true },
        { label: '民族', value: '4', checked: true },
        { label: '政治面貌', value: '5', checked: true },
        { label: '学号', value: '6', checked: true },
        { label: '入学时间', value: '7', checked: true },
        { label: '毕业时间', value: '8', checked: true },
        { label: '家庭地址', value: '9', checked: true },
        { label: '详细地址', value: '10', checked: true }
    ];
    economyDisplayBox = []; //家庭经济情况展示  ---弹框选择
    //搜索条件
    searchObj = {
        academy: '',  //学院
        major: '',      //专业
        grade: '',      //年级
        class: '',      //班级
        name: '',       //姓名
        sex: '',        //性别
        nation: '',     //民族
        polity: '',     //政治面貌
        schoolId: '',   //学号
        beginTime: '',  //入学时间
        endTime: '',    //毕业时间
        province: '',    //省
        city: '',       //市
        county: '',     //县
        addressCode: '',    //家庭住址代码
        addressName: '',    //家庭住址名称
        rank: '',       //困难等级
        type: '',       //认定类型
        Page: 1,
        PageSize: 30,
        total: 0,
    }
    isShowView = true;      //是否有权限
    dataEmpty = true;       //是否有数据
    addressIcon = false;  //地址删除图标
    showLoading = false  //加载中图标 

    constructor(public httpService: HttpService, private msgSrv: NzMessageService) { }

    ngOnInit(): void {
        this.loadUserType();    //获取登录角色
        this.onSearch(true);      //获取数据
        this.loadAcademy();     //获取学院
        this.loadMajor();       //获取专业
        this.loadGrade();       //获取年级
        this.loadClass();       //获取班级
        this.loadSex();         //获取性别
        this.loadNation();      //获取民族
        this.loadPolity();      //获取政治面貌
        this.loadBegin();      //获取入学时间
        this.loadEnd();         //获取毕业时间
        this.loadProvince();         //获取省
        this.loadRanks();         //获取困难等级
        this.loadType();         //获取认定类型
        this.loadEnomyCheck();   //获取经济情况复选框
    }
    //获取用户角色
    loadUserType() {
        this.httpService.POST({
            Router: ServelUrl.Url.getaccess,
            Method: 'GET',
            Body: {}
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data.role == 'NoAuth') {
                    this.isShowView = false;
                    alert('无访问权限')
                    return false;
                }
            }
        })
    }
    //获取数据列表
    onSearch(obj) {
        if(obj){
            this.searchObj.Page = 1
        }
        var nonego = '5';
        var economicsituationArr = [];

        for (var i in this.searchObj) {
            if (this.searchObj[i] == null) {
                this.searchObj[i] = '';
            }
        }

        this.searchObj.name = this.searchObj.name.trim();
        this.searchObj.schoolId = this.searchObj.schoolId.trim();

        if (this.displayCheckbox.length && this.displayCheckbox[0].checked == true) {
            nonego = '1'
        }
        for (let i = 1; i < this.displayCheckbox.length; i++) {
            if (this.displayCheckbox[i].checked == true) {
                economicsituationArr.push(this.displayCheckbox[i].value)
            }
        }

        this.httpService.POST({
            Router: ServelUrl.Url.getruntimesearch,
            Method: 'POST',
            Body: {
                academy: this.searchObj.academy,
                major: this.searchObj.major,
                grade: this.searchObj.grade,
                class: this.searchObj.class,
                name: this.searchObj.name,
                sex: this.searchObj.sex,
                national: this.searchObj.nation,
                nonego: nonego,
                political: this.searchObj.polity,
                usercode: this.searchObj.schoolId,
                entrance: this.searchObj.beginTime,
                graduation: this.searchObj.endTime,
                address: this.searchObj.addressCode,
                recognitionlevel: this.searchObj.rank,
                recognitiontype: this.searchObj.type,
                economicsituation: economicsituationArr.join(','),
                pageindex: this.searchObj.Page,
                pagesize: this.searchObj.PageSize,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.searchObj.total = res.Data.total
                this.dataSet = res.Data.items;
                if (this.dataSet.length == 0) {
                    this.dataEmpty = false;
                } else {
                    this.dataEmpty = true;
                }
            }
        })
    }

    //获取学院
    loadAcademy() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimeacademydropdownList,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.academyOption = res.Data;
            }
        });
    }
    //获取专业
    loadMajor() {
        this.searchObj.major = null;
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimemajordropdownList,
            Method: 'POST',
            Body: {
                academy: this.searchObj.academy
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.majorOption = res.Data;
            }
        });
    }
    //获取年级
    loadGrade() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimegradedropdownList,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.gradeOption = res.Data;
            }
        });
    }
    //获取班级
    loadClass() {
        this.searchObj.class = null;
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimeclassdropdownlist,
            Method: 'POST',
            Body: {
                major: this.searchObj.major,
                grade: this.searchObj.grade,
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.classOption = res.Data;
            }
        });
    }
    //获取性别
    loadSex() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimesexdropdownlist,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.sexOption = res.Data;
            }
        });
    }
    //获取民族
    loadNation() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimenationaldropdownlist,
            Method: 'POST',
            Body: {
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.nationOption = res.Data;
            }
        });
    }
    //获取政治面貌
    loadPolity() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimepoliticaldropdownlist,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.polityOption = res.Data;
            }
        });
    }
    //获取入学时间
    loadBegin() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimeentrancedropdownlist,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.beginOption = res.Data;
            }
        });
    }
    //获取毕业时间
    loadEnd() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimegraduationdropdownlist,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.endOption = res.Data;
            }
        });
    }
    //获取省
    loadProvince() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimeprovincialdropdownlist,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.provinceOption = res.Data;
            }
        });
    }
    //获取市
    loadCity() {
        this.searchObj.city = null;
        this.searchObj.county = null;
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimecitydropdownList,
            Method: 'POST',
            Body: {
                provincial: this.searchObj.province
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.cityOption = res.Data;
            }
        });
    }
    //获取县
    loadCounty() {
        this.searchObj.county = null;
        this.httpService.postJSON({
            Router: ServelUrl.Url.getruntimecountydropdownList,
            Method: 'POST',
            Body: {
                city: this.searchObj.city
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.countyOption = res.Data;
            }
        });
    }
    //获取困难等级
    loadRanks() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getrecognitionleveldropdownlist,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.ranksOption = res.Data;
            }
        });
    }
    //获取认定类型
    loadType() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getrecognitiontypedropdownlist,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.typeOption = res.Data;
            }
        });
    }
    //获取经济情况复选框
    loadEnomyCheck() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.geteconomicconditionlist,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.displayCheckbox = JSON.parse(JSON.stringify(res.Data));
                this.economyDisplayBox = JSON.parse(JSON.stringify(res.Data));
                this.displayCheckbox.unshift({ label: '少数民族', value: '001' })
                for (var i = 0; i < this.displayCheckbox.length; i++) {
                    this.displayCheckbox[i]['checked'] = false;
                }
                for (var i = 0; i < this.economyDisplayBox.length; i++) {
                    this.economyDisplayBox[i]['checked'] = true;
                }
            }
        });
    }
    //重置
    resetForm(form) {
        form.reset();
        for (let i = 0; i < this.displayCheckbox.length; i++) {
            this.displayCheckbox[i]['checked'] = false;
        }
        this.searchObj.province = null;
        this.searchObj.city = null;
        this.searchObj.county = null;
        this.searchObj.addressName = '';
        this.searchObj.addressCode = '';
    }
    //鼠标移入
    mouseenter() {
        if (this.searchObj.addressName) {
            this.addressIcon = true;
        }
    }
    //鼠标移出
    mouseLeave() {
        this.addressIcon = false;
    }
    //删除地址
    deleteAddress(e) {
        e.stopPropagation();
        this.searchObj.addressName = '';
        this.searchObj.addressCode = '';
    }
    //=地址弹框=======
    isAddress = false;
    //点击出现弹框
    showAddress(): void {
        this.isAddress = true;
    }
    addressOk(): void {
        this.isAddress = false;

        if (this.searchObj.county) {
            this.searchObj.addressCode = this.searchObj.county;

            var provinceName = '';
            var cityName = '';
            var countyName = '';
            //获取省名
            for (let i = 0; i < this.provinceOption.length; i++) {
                if (this.searchObj.province == this.provinceOption[i].Code) {
                    provinceName = this.provinceOption[i].Name
                }
            }
            //获取市名
            for (let i = 0; i < this.cityOption.length; i++) {
                if (this.searchObj.city == this.cityOption[i].Code) {
                    cityName = this.cityOption[i].Name
                }
            }
            //获取区 县名
            for (let i = 0; i < this.countyOption.length; i++) {
                if (this.searchObj.county == this.countyOption[i].Code) {
                    countyName = this.countyOption[i].Name
                }
            }
            if (cityName == provinceName) {
                this.searchObj.addressName = cityName + countyName
            } else {
                this.searchObj.addressName = provinceName + cityName + countyName
            }

        } else if (!this.searchObj.county && this.searchObj.city) {
            this.searchObj.addressCode = this.searchObj.city;

            var provinceName = '';
            var cityName = '';
            //获取省名
            for (let i = 0; i < this.provinceOption.length; i++) {
                if (this.searchObj.province == this.provinceOption[i].Code) {
                    provinceName = this.provinceOption[i].Name
                }
            }
            //获取市名
            for (let i = 0; i < this.cityOption.length; i++) {
                if (this.searchObj.city == this.cityOption[i].Code) {
                    cityName = this.cityOption[i].Name
                }
            }
            if (cityName == provinceName) {
                this.searchObj.addressName = cityName
            } else {
                this.searchObj.addressName = provinceName + cityName
            }

        } else if (!this.searchObj.city && this.searchObj.province) {
            this.searchObj.addressCode = this.searchObj.province;
            for (let i = 0; i < this.provinceOption.length; i++) {
                if (this.searchObj.province == this.provinceOption[i].Code) {
                    this.searchObj.addressName = this.provinceOption[i].Name
                }
            }
        }
    }
    addressCancel(): void {
        this.isAddress = false;
    }
    //=基础信息数据展示弹框=======
    isBasicInfo = false;
    //点击出现弹框
    showBasicInfo = () => {
        this.isBasicInfo = true;
    }
    //点击收起
    basicOk = (e) => {
        this.isBasicInfo = false;
    }
    //关闭弹框
    basicCancel(e): void {
        this.isBasicInfo = false;
    }
    //全选
    basicCheckAll() {
        for (let i = 0; i < this.basicDisplayBox.length; i++) {
            this.basicDisplayBox[i].checked = true
        }
    }
    //取消
    basicCannel() {
        for (let i = 0; i < this.basicDisplayBox.length; i++) {
            this.basicDisplayBox[i].checked = false;
        }
    }
    //=家庭经济情况展示弹框======
    isFmEconomy = false;
    //点击出现弹框
    showFmEconomy = () => {
        this.isFmEconomy = true;
    }
    //点击收起
    economyOk = (e) => {
        this.isFmEconomy = false;
    }
    //关闭弹框
    economyCancel(e): void {
        this.isFmEconomy = false;
    }
    //全选
    economyCheckAll() {
        for (let i = 0; i < this.economyDisplayBox.length; i++) {
            this.economyDisplayBox[i].checked = true
        }
    }
    //取消
    economyCannel() {
        for (let i = 0; i < this.economyDisplayBox.length; i++) {
            this.economyDisplayBox[i].checked = false;
        }
    }

    //=数据导出弹框======
    isExport = false;
    //点击出现弹框
    exportAlert = () => {
        this.isExport = true;
    }
    //点击收起
    exportOk = (e) => { 
        this.showLoading = true;
        this.isExport = false;

        var nonego = '5';
        var economicsituationArr = [];

        for (var i in this.searchObj) {
            if (this.searchObj[i] == null) {
                this.searchObj[i] = '';
            }
        }

        this.searchObj.name = this.searchObj.name.trim();
        this.searchObj.schoolId = this.searchObj.schoolId.trim();

        if (this.displayCheckbox.length && this.displayCheckbox[0].checked == true) {
            nonego = '1'
        }
        for (let i = 1; i < this.displayCheckbox.length; i++) {
            if (this.displayCheckbox[i].checked == true) {
                economicsituationArr.push(this.displayCheckbox[i].value)
            }
        }

        this.httpService.POSTNotLaoding({
            Router: ServelUrl.Url.getruntimesearchexportdata,
            Method: 'POST',
            Body: {
                academy: this.searchObj.academy,
                major: this.searchObj.major,
                grade: this.searchObj.grade,
                class: this.searchObj.class,
                name: this.searchObj.name,
                sex: this.searchObj.sex,
                national: this.searchObj.nation,
                nonego: nonego,
                political: this.searchObj.polity,
                usercode: this.searchObj.schoolId,
                entrance: this.searchObj.beginTime,
                graduation: this.searchObj.endTime,
                address: this.searchObj.addressCode,
                recognitionlevel: this.searchObj.rank,
                recognitiontype: this.searchObj.type,
                economicsituation: economicsituationArr.join(','),
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if(res.Data.length){
                    window.location.href = res.Data[0].filename;
                }else{
                    this.msgSrv.warning('没有查询结果可以导出!');
                }
            }
            this.showLoading = false;
        })
    }
    //关闭弹框
    exportCancel(e): void {
        this.isExport = false;
    }
}

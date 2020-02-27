import { NzMessageService } from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from '../../../ServelUrl';


@Component({
  selector: 'app-dormitorydata',
  templateUrl: './dormitorydata.component.html',
  styleUrls: ['./dormitorydata.component.css']
})
export class DormitorydataComponent implements OnInit {
  isVisible = false;
  searchObj = {
    Campus: '',
    District: '',
    DormNumber: '',
    Unit: '',
    RoomNumber: '',
    StuID: '',
    StuName: '',
    Sex: '',
    Academy: '',
    Major: '',
    Grade: '',
    Class: '',
    Nation: '',
    PoliticalStatus: '',
    Source: ''
  }
  Geography = {
    province: '',
    city: '',
    country: ''
  }
  data = [];
  _loading = false;
  //下拉框存值
  Campus = [];
  District = [];  //园区
  Dormitoey = []   //宿舍
  Unit = [];     //单元
  Academy = [];  //学院
  Room = [];    //宿舍号
  Major = [];    //专业
  Grade = [];    //年级
  Class = [];    //班级
  Sex = [];      //性别
  Nation = [];    //民族
  Political = [];  //政治面貌
  Province = [];   //省份
  City = [];       //城市
  County = [];    //县级

  source = [];    //存储生源地拼接
  sourceCode = [];
  sourceName = [];
  sourceCodeStr = '';
  sourceNameStr = '';
  MojorCode = "";
  GradeCode = "";
  fatheSource = [
    { value: '', label: '' },
  ];
  // page = {
  //   Page: 1,
  //   PageSize: 30,
  // };
  // PageIndex=1;
  // PageSize= 30;
  // total = 0;
    page = {
        Page: 1,
        PageSize:30,
    };
    total = 0;
  constructor(private route: Router, private httpService: HttpService, public msgSrv: NzMessageService, private confirmServ: NzModalService) { }

  ngOnInit() {
    this.queryCampus();
    this.queryAcademyList();
    this.queryGradeList();
    this.queryNationalityList();
    this.queryPoliticalList();
    this.querySexList();
    this.province();
    this.onSearch();
  }
  // 详细信息
  details(e, detData) {
      var durname ="";
    if (detData.RoomId == "") {
        this.confirmServ.confirm({
            title  : '友情提示',
            // content: '<b>(需要园区|宿舍楼号|单元|宿舍号)四者缺一不可,参数不全无法查询</b>',
            content: '<b>宿舍号没有，无法查询查阅到宿舍成员信息</b>',
            onOk() {
            },
            onCancel() {
            }
        });
    }
    else {
        if (detData.DistrictName && detData.DistrictName !=""){
            durname +=detData.DistrictName;
        }
        if (detData.DormitoryName &&detData.DormitoryName !=""){
            durname +=detData.DormitoryName;
        }
        if (detData.UnitName  && detData.UnitName !=""){
            durname +=detData.UnitName;
        }
        if (detData.RoomName  !=""){
            durname +=detData.RoomName;
            console.log(durname)
        }
        this.route.navigate(['./dormitorydata/details', {roomid: detData.RoomId, ddurname:durname }]);
    }
  }
  // 校区
  queryCampus() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetCampusList,
      Method: 'POST',
      Body: {
      }
    }).then(res => {

      if (res.FeedbackCode == 200) {
        this.Campus = res.Data;
      } else {
        this.msgSrv.success(res.FeedbackText);
      }
    })
  }
  // 园区
  queryDistrict(campusId) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetDistrictList,
      Method: 'POST',
      Body: {
        campusid: campusId
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.District = res.Data;
      }
    })
  }
  // 宿舍楼
  queryDormitoryList(districtId) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetDormitoryList,
      Method: 'POST',
      Body: {
        districtid: districtId
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Dormitoey = res.Data;
      }
    })
  }
  // 单元
  queryUnitList(dormcode) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetUnitList,
      Method: 'POST',
      Body: {
        dormitoryid: dormcode
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Unit = res.Data;
      }
    })
  }
  // 宿舍号
  queryAllRoomNum(unitCode) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetRoomList,
      Method: 'POST',
      Body: {
        unitid: unitCode
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Room = res.Data;
      }
    })
  }
  // 联动园区
  district(code) {
    this.searchObj.District = null;
    this.searchObj.DormNumber = null;
    this.searchObj.Unit = null;

    if (code) {
      this.queryDistrict(code.toString());
    }
    else if (code == null) {
      code = "";
    }
    else { this.queryDistrict(code); }
  }
  // 联动宿舍
  dormitory(distructCode) {
    this.searchObj.DormNumber = null;
    this.searchObj.Unit = null;
    if (distructCode) {
      this.queryDormitoryList(distructCode.toString());
    } else if (distructCode == null) {
      distructCode = "";
    }
    else { this.queryDormitoryList(distructCode); }
  }
  // 联动单元
  unit(dormCode) {
    this.searchObj.Unit = null;
    if (dormCode) {
      this.queryUnitList(dormCode.toString());
    } else if (dormCode == null) {
      dormCode = "";
    } else {
      this.queryUnitList(dormCode);
    }

    // this.queryUnitList(dormCode.toString());
  }
  room(unitCode) {

    if (unitCode) {
      this.queryAllRoomNum(unitCode.toString());
    } else if (unitCode == null) {
      unitCode = "";
    }
    else {
      this.queryAllRoomNum(unitCode);
    }


  }
  // 学院
  queryAcademyList() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetAcademyList,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Academy = res.Data;
      }
    })
  }
  querySexList() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetSexList,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Sex = res.Data;
      }
    })
  }
  // 专业
  queryMajorList(academyCode) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetMajorList,
      Method: 'POST',
      Body: {
        academyid: academyCode
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Major = res.Data;
      }
    })
  }
  // 年级
  queryGradeList() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetGradeList,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Grade = res.Data;
      }
    })
  }

  // 联动专业
  major(academyCode) {
    this.searchObj.Major = null;
    this.searchObj.Grade = null;
    this.searchObj.Class = null;
    if (academyCode) {

      this.queryMajorList(academyCode.toString());
    }
    else if (academyCode == null) {
      academyCode = "";
    }
    else { this.queryMajorList(academyCode); }
  }
  // 联动班级
  class(Code, type) {
    console.log(Code)
    if (type == 'major') {
      if (Code == null) {
        this.MojorCode = ""
      } else {
        this.MojorCode = Code;
      }
    }
    console.log("grade")
    if (type == 'grade') {
      // this.GradeCode = Code;
      if (Code == null) {
        this.GradeCode = ""
      } else {
        this.GradeCode = Code;
      }
    }
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetClassList,
      Method: 'POST',
      Body: {
        majorgradeid: {
          majorid: this.MojorCode,
          gradeid: this.GradeCode
        }
      }
      // MajorId: majorId
      // }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Class = res.Data;
      }
    })
    // }

    // }
  }
  // 民族
  queryNationalityList() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetNationalityList,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Nation = res.Data;
      }
    })
  }
  // 政治面貌
  queryPoliticalList() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetPoliticalList,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Political = res.Data;

      }
    })
  }
  // 省市县弹窗
  modal() {
    this.isVisible = true;
  }
  handleCancel() {
    this.isVisible = false;
  }
  handleOk(e, pro = "", cit = "", county = "") {
    // this.province();
    this.source = [];
    this.sourceCode = [];
    this.sourceName = [];
    console.log(pro, cit, )
    if (pro != "" && pro != null) {
      this.source.push(pro);
    }

    if (cit != "" && cit != null) {
      this.source.push(cit);
    }

    if (county != "" && county != null) {
      this.source.push(county);
    }
    // if()
    this.source.forEach(element => {
      this.sourceCode.push(element.GeographyCode);
      this.sourceName.push(element.GeographyName);
    });
    if (this.sourceCode) {
      this.sourceCodeStr = this.sourceCode.toString();
    }
    if (this.sourceName) {
      this.sourceNameStr = this.sourceName.toString();
    }
    this.searchObj.Source = this.sourceNameStr;
    this.isVisible = false;
  }
  // 省份
  province() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetProvinceList,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.Province = res.Data;
      }
    })
  }
  // 城市
  cityList(provinceCode) {
    let provinceid = "";
    this.Geography.city = null;
    this.Geography.country = null;
    if (provinceCode) {
      provinceid = provinceCode.GeographyCode;
    } else {
      provinceid = ""
    }
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetCityList,
      Method: 'POST',
      Body: {
        provinceid: provinceid
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.City = res.Data;
      }
    })
  }
  // 县级
  countryList(cityCode) {
    let cityid = "";
    if (cityCode) {
      cityid = cityCode.GeographyCode;
    } else {
      cityid = ""
    }
    this.Geography.country = null;
    if (this.Geography.country == null) {
      this.Geography.country = "";
    }
    // this.Geography.country = null;
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetCountyList,
      Method: 'POST',
      Body: {
        cityid: cityid
      }
    }).then(res => {
      if (res.FeedbackCode == 200) {
        this.County = res.Data;
      }
    })
  }

    StudentVaildErrs = 0;
  onBlurStudentVaild(str: string,StudentVaildErrs = 0){
      if(str.length > 0){
        if(str.length >12){
            StudentVaildErrs +=1;
            this.confirmServ.confirm({
                title  : '友情提示',
                content: '<b>输入学号太长,请重新输入(学号为12位数字)</b>',
                onOk() {
                    console.log('确定');
                },
                onCancel() {
                }
            });
        }else{
            var reg=/^[0-9]{1,12}$/;   /*定义验证表达式*/
            if(!reg.test(str)){
                StudentVaildErrs +=1;
                this.confirmServ.confirm({
                    title  : '友情提示',
                    content: '<b>学号只能为数字格式，请重新输入</b>',
                    onOk() {
                        console.log('确定');
                    },
                    onCancel() {
                    }
                });
            }
        }
      }
  }

  NameVaildErrs = 0;
  //验证姓名
  onBlurNameVaild(str: string,NameVaildErrs = 0){
    if(str.length > 0){
        if (str.length >9) {
            NameVaildErrs +=1;
            this.confirmServ.confirm({
                title  : '友情提示',
                content: '<b>输入名字太长,请重新输入</b>',
                onOk() {
                    console.log('确定');
                },
                onCancel() {
                }
            });
        }else{
            var reg=/^[\u4E00-\u9FA5]{1,9}$/;  /*定义验证表达式*/
            if(!reg.test(str) && str.length>0){
                NameVaildErrs +=1;
                console.log("error"+NameVaildErrs)
                this.confirmServ.confirm({
                    title  : '友情提示',
                    content: '<b>名字只能为中文格式，请重新输入</b>',
                    onOk() {
                        console.log('确定');
                    },
                    onCancel() {
                    }
                });
            }
        }
    }
  }

  // 查询
  onSearch(reload = false) {
    if (this.Geography.city == null && this.Geography.country == null && this.Geography.province == null) {
      this.sourceCodeStr = "";
    }

    if (this.StudentVaildErrs !=0 || this.NameVaildErrs != 0){
        this.confirmServ.confirm({
            title  : '友情提示',
            content: '<b>请求参数有误，请重新选择</b>',
            onOk() {
            },
            onCancel() {
            }
        });
    }

    // this.page.Page = 1;
    this._loading = true;
    if (reload) {
        this.page.Page=1
    }
    this.nullToString();
    let source = [];
    this.httpService.postJSON({
      Router: ServelUrl.Url.GetSearch,
      Method: 'POST',
      Body: {
        campusid: this.searchObj.Campus.toString(),
        districtid: this.searchObj.District.toString(),
        dormitoryid: this.searchObj.DormNumber.toString(),
        unitid: this.searchObj.Unit.toString(),
        roomid: this.searchObj.RoomNumber,
        studentid: this.searchObj.StuID,
        nameid: this.searchObj.StuName,
        sexid: this.searchObj.Sex,
        academyid: this.searchObj.Academy,
        majorid: this.searchObj.Major,
        gradeid: this.searchObj.Grade,
        classid: this.searchObj.Class,
        nationalityid: this.searchObj.Nation,
        politicalid: this.searchObj.PoliticalStatus,
        studentareaid: this.sourceCodeStr,
        pageindex: this.page.Page,
        pagesize: this.page.PageSize,
      }
    }).then(res => {
      this._loading = false;
      if (res.Data.items.length> 0){
          this.data = res.Data.items;
      }else{
          this.data = [];
      }
      if (res.Data.total> 0){
        this.total = res.Data.total;
      }else{
          this.total = 0;
      }
    })
    // this.queryList();
  }
  // 遍历选择框
  nullToString() {
    for (var key in this.searchObj) {
      if (this.searchObj.hasOwnProperty(key)) {
        if (this.searchObj[key] == null) {
          this.searchObj[key] = "";
        }
      }

    }
  }
  // reset
  resetForm(form) {
    form.reset();
    this.nullToString();
    this.Geography.city = null;
    this.Geography.country = null;
    this.Geography.province = null;

    // this.onSearch(true);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/http/http.service';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-studentarea',
  templateUrl: './studentarea.component.html',
  styleUrls: ['./studentarea.component.less']
})
export class StudentareaComponent implements OnInit {
  Province = [];   // 省份
  City = [];       // 城市
  County = [];    // 县级
  Geography = {
    province: '',
    city: '',
    country: ''
  };
  StudentAreaCode: any;
  constructor(private modal: NzModalRef, private httpService: HttpService) { }

  ngOnInit() {
    this.province();
  }
 // 省份
 province() {
  this.httpService.POST({
    Router: '/api/department/getprovincelist',
    Method: 'POST',
    Body: {}
  }).subscribe(res => {
    if (res.FeedbackCode === 200) {
      this.Province = res.Data || [];
      console.log(this.StudentAreaCode);
      if (this.StudentAreaCode) {
        this.Geography.province = this.StudentAreaCode.substring(6);
      }

    }
  });
}
// 城市
cityList(provinceCode) {
  let provinceid = '';
  this.Geography.city = null;
  this.Geography.country = null;
  if (provinceCode) {
    provinceid = provinceCode.GeographyCode;
  } else {
    provinceid = '';
  }
  this.httpService.POST({
    Router: '/api/department/GetCityList',
    Method: 'POST',
    Body: {
      provinceid: provinceid
    }
  }).subscribe(res => {
    if (res.FeedbackCode === 200) {
      this.City = res.Data;
    }
  });
}
// 县级
countryList(cityCode) {
  let cityid = '';
  if (cityCode) {
    cityid = cityCode.GeographyCode;
  } else {
    cityid = '';
  }
  this.Geography.country = null;
  if (this.Geography.country == null) {
    this.Geography.country = '';
  }
  // this.Geography.country = null;
  this.httpService.POST({
    Router: '/api/department/GetCountyList',
    Method: 'POST',
    Body: {
      cityid: cityid
    }
  }).subscribe(res => {
    if (res.FeedbackCode === 200) {
      this.County = res.Data;
    }
  });
}
save() {
this.modal.destroy(this.Geography);
}

}

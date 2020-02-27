import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http/http.service';
import {ModalComponent} from './modal/modal.component';
import {ModalHelper} from '../share/modalHelper';
import {forkJoin, Observable} from 'rxjs';
import {NzMessageService} from "ng-zorro-antd";

@Component({selector: 'app-staff', templateUrl: './staff.component.html', styleUrls: ['./staff.component.less']})
export class StaffComponent implements OnInit {
  i = 1;
  editCache = {};
  AcdemyYears = [];
  loading=false;
  currentYear='';
  Academys = [];
  page = {
    page: 1,
    count: 10
  };
  total = 0;
  ResultTypes = [];
  dataSet = [];
  searchObj = {
    year: null,
    academyCode: null
  };

  constructor(private message: NzMessageService,private http: HttpService, private modalHelper: ModalHelper) {
  }

  ngOnInit() {
    //学年
    this.queryYear();
    //学院
    this.queryAcademy();
    //结果类型
    this.queryResultType();
    //初始查询数据
    //this.onSearch();
    /*   for (let i = 0; i < 100; i++) {
         this.dataSet.push({
           key: i.toString(),
           name: `Edrward ${i}`,
           age: 32,
           address: `London Park no. ${i}`,
         });
       }
       this.updateEditCache();*/
  }

  /**
   * 初始化数据
   * @param _value
   */
  onSearch(reload = false) {
    console.log(this.searchObj);
    this.loading=true;
    if (reload) {
      this.page.page = 1;
    }
    this
      .http
      .POST({
        Router: '/api/pc/assess/queryacademyassess',
        Method: 'POST',
        Body: Object.assign({
          year: this.searchObj.year || '',
          academyCode: this.searchObj.academyCode || '',
        }, {page:this.page.page-1,count:this.page.count})
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          if (res.Data) {
            this.dataSet = res.Data.datas;
            this.total = parseInt(res.Data.total) || 0;
            this.currentYear = res.Data.year;
            this.dataSet.forEach((data, index) => {
              data.sum=0;
              data.key = index;
            })
            this.updateEditCache();
            this.loading=false;
          }
        } else {
          console.log(res.Data.FeedbackText);
        }
      });
  }

  /**
   * 学年
   */
  queryYear() {
    this
      .http
      .POST({
        Router: '/api/pc/assess/queryyear',
        Method: 'POST',
        Body: {}
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          if (res.Data) {
            this.AcdemyYears = res.Data;

            this.AcdemyYears.forEach(year => {
              if (year.Remark4 === '1') {
                this.searchObj.year = year.Code;
              }
            });
            if(!this.currentYear){
              this.onSearch();
            }
          }
        } else {
          console.log(res.Data.FeedbackText);
        }
      });
  }

  /**
   * 学院
   */
  queryAcademy() {
    this
      .http
      .POST({
        Router: '/api/pc/assess/queryacademy',
        Method: 'POST',
        Body: {}
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          if (res.Data) {
            this.Academys = res.Data;
          }
        } else {
          console.log(res.Data.FeedbackText);
        }
      });
  }

  /**
   *
   */
  queryResultType() {
    this
      .http
      .POST({
        Router: '/api/pc/assess/queryresulttype',
        Method: 'POST',
        Body: {}
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          if (res.Data) {
            this.ResultTypes = res.Data;

          }
        } else {
          console.log(res.Data.FeedbackText);
        }
      });
  }

  //更新学院分数
  UpAcademyScore(params,type,score): Observable<any> {
    return this
      .http
      .POST({
        Router: '/api/pc/assess/upacademyscore',
        Method: 'POST',
        Body: {
          academy:params.AcademyCode,
          year:this.currentYear,
          typeCode:type,
          score:score.toString()
        }
      })
  }
  //更新考核结果
  UpAcademyResult(params,resultCode): Observable<any> {
    return this
      .http
      .POST({
        Router: '/api/pc/assess/upacademyresult',
        Method: 'POST',
        Body: {
          academy:params.AcademyCode,
          year:this.currentYear,
          resultCode:resultCode
        }
      })
  }

  resetForm(form) {
  //  form.reset();
   // this.searchObj.year = null;
    this.searchObj.academyCode = null;
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
    this.onSearch();
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[index] = this.editCache[key].data;
    console.log('this.dataSet[index]:',this.dataSet[index]);
   let a1= this.UpAcademyScore(this.dataSet[index],'0070021',this.dataSet[index].A1).subscribe(res=>{
     console.log(res);
     if(!res.FeedbackCode){
       this.UpAcademyResult(this.dataSet[index],this.dataSet[index].ResultCode).subscribe(res=>{
         if(!res.FeedbackCode){
           this.message.success('保存成功!');
           this.onSearch();
         }
       })

     }
   })
 /*  let Result= this.UpAcademyResult(this.dataSet[index],this.dataSet[index].ResultCode);
    forkJoin([a1,Result])
     .subscribe(results => {
       console.log(results)
       //this.post1 = results[0];
      // this.post2 = results[1];
       if(!results[0].FeedbackCode&&!results[1].FeedbackCode){
          this.message.success('保存成功!');
          this.onSearch();
       }
     });*/
    this.editCache[key].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
        this.editCache[item.key] = {
          edit: false,
          data: item
        };
    });
  }

  onModal(params) {
    params.year=this.currentYear;
    this
      .modalHelper
      .open(ModalComponent, {params:params}, 600, {})
      .subscribe((geo) => {
        /*  this.st.load();
         this.msg.info('回调，重新发起列表刷新'); */
        if(geo&&geo.save){
          this.onSearch();
        }
      });
  }
  onChange($event,data){
    data.sum=parseInt(data.A1)+parseInt(data.A2);
    console.log($event)
  }
}

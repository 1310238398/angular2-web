import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from 'src/http/http.service';
import {ModalHelper} from '../../share/modalHelper';
import {MoreComponent} from './more/more.component';
import {CommonService} from '../../service/common.service';
import {StudentareaComponent} from '../studentarea/studentarea.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less', '../common.less']
})
export class StudentComponent implements OnInit {
  Advanced = false;
  loading = true;
  display = false;
  errText;
  page = {
    Page: 1,
    PageSize: 10
  };
  total = 0;
  Sexs = [];
  Campuss = [];
  Academys = [];
  Majors = [];
  Grades = [];
  Classs = [];
  Politicals = [];
  Nationalitys = [];
  StudentTypes = [];
  More = true;
  searchValue = '';
  QType: 'All';
  studentLists = [];
  searchObj = {
    UserCode: '', // 学号
    Name: '', // 姓名
    Phone: '',
    Sex: null,
    Campus: null,
    Academy: null,
    Major: null,
    Grade: null,
    Class: null,
    StudentAreaCode: '',
    Political: null,
    Nationality: null,
    StudentType: null
  };
  StudentAreaName = '';
  academy = '';
  noCondition = false;
  // tslint:disable-next-line:max-line-length
  constructor(private commonService: CommonService, private modalHelper: ModalHelper, public route: ActivatedRoute, private http: HttpService, ) {}

  ngOnInit() {
    this
      .route
      .queryParams
      .subscribe(params => {
        console.log(params);
        this.academy = params.academy || '';
        if (params.QType) {
          this.searchValue = params.searchValue;
          this.QType = params.QType;
          // es查询
          this.esSearch(true, this.QType, params.academy);
        } else {
          this.Advanced = true;
          this.errText = '请优化查询条件';
          this.loading = false;
          console.log('searchObj', params.searchObj);
          this.searchValue = params.searchObj;
        }

      });
    // 校区
    this
      .commonService
      .loadCampus()
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.Campuss = res.Data;
        }
      });
    // 学院选择
    this.loadAcademy();
    // 年级选择
    this.loadGade();
    // 性别选择
    this.loadBizCode('Sex');
    // 政治面貌
    this.loadBizCode('Political');
    // 民族
    this.loadBizCode('Nationality');
    // 学生类型
    this.loadBizCode('StudentType');
  }
  /*加载bizcode*/
  loadBizCode(code) {
    this
      .commonService
      .loadBizCode(code)
      .subscribe(res => {
        if (!res.FeedbackCode) {
          const $_var = `${code}s`;
          this[$_var] = res.Data || [];
        }

      });
  }
  /*加载学院*/
  loadAcademy() {
    this
      .commonService
      .loadAcademy()
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.Academys = res.Data || [];
        }
      });
  }

  /*加载专业*/
  loadMajor() {
    this
      .commonService
      .loadMajor(this.searchObj.Academy)
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.Majors = res.Data || [];
        }

      });

  }

  /*加载年级*/
  loadGade() {
    this
      .commonService
      .loadGade()
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.Grades = res.Data || [];
        }

      });

  }

  /*加载班级*/
  loadClass() {
    this
      .commonService
      .loadClass({
        Campus: this.searchObj.Campus || '',
        Academy: this.searchObj.Academy || '',
        Major: this.searchObj.Major || '',
        Grade: this.searchObj.Grade || ''
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.Classs = res.Data || [];
        }
      });
  }
  /**
 * 下拉选择
 * @param type
 */
  onSelect(type) {
    switch (type) {
      case 'major':
        this.loadMajor();
        break;
      case 'class':
        this.loadClass();
        break;
    }

  }
  errorHandler(event) {
    event.target.src = '';
  }
  /**
 * 生源地选择
 */
  onStudentAreaCode() {
    this
      .modalHelper
      .open(StudentareaComponent, {
        StudentAreaCode: this.searchObj.StudentAreaCode
      }, 400, {})
      .subscribe((geo) => {
        if (geo) {
          // tslint:disable-next-line:max-line-length
          this.StudentAreaName = `${(geo.province && geo.province.GeographyName) || ''}${(geo.city && geo.city.GeographyName) || ''}${(geo.country && geo.country.GeographyName) || ''}`;
          // tslint:disable-next-line:max-line-length
          this.searchObj.StudentAreaCode = `${(geo.province && geo.province.GeographyCode) || ''}${(geo.city && geo.city.GeographyCode) || ''}${(geo.country && geo.country.GeographyCode) || ''}`;
        }
        console.log(geo);
      });
  }
  resetForm(form) {
    form.reset();
    this.searchObj.Academy = null;
    this.searchObj.Major = null;
    this.searchObj.Grade = null;
    this.searchObj.Class = null;
  }

  /**
   *
   * @constructor
   */
  AllesSearch() {
    this.QType = 'All';
    this.esSearch(true, 'All');
  }
  /**
   * 是否高级查询
   */
  onAdvanced() {
    this.Advanced = !this.Advanced;
    const queryParams = this
      .commonService
      .mapObject(this.searchObj);
    console.log(queryParams);
    // this.router.navigate(['/student'], {queryParams: queryParams});
  }
  /**
   * 分页查询change
   */
  onSearch(flag) {
    if (!this.Advanced) {
      this.esSearch(flag, this.QType, this.academy);
    } else {
      this.onEsHightSearch(flag);
    }
  }
  /**
   * es查询
   * @param _value
   */
  esSearch(reload= false, QType, academy= '') {
    console.log(this.searchValue);
    this.loading = true;
    if (reload) {
      this.page.Page = 1;
    }
    this
      .http
      .POST({
        Router: '/api/squery/studentquery/info',
        Method: 'POST',
        Body: Object.assign({
          QType: QType || 'All',
          academy: academy,
          Condition: this.searchValue
        }, this.page)
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.loading = false;
          if (res.Data) {
            this.studentLists = res.Data.Data;
            this.total = res.Data.Total || 0;
            this
              .studentLists
              .forEach(stu => {
                stu
                  .Highlight
                  .forEach(item => {
                    if (item.Key === '学号') {
                      stu.UserCode = item.Value || '学号为空';
                    }
                  });
              });
          }
        } else {
          this.loading = false;
          console.log(res.Data.FeedbackText);
        }
      });
  }

  /**
   * 更多
   */
  expandMore(stu) {
    stu.More = !stu.More;
    if (stu.More) {
      this
        .modalHelper
        .open(MoreComponent, {
          Highlight: stu.Highlight
        }, 500, {})
        .subscribe((geo) => {
          stu.More = !stu.More;
          /*  this.st.load();
           this.msg.info('回调，重新发起列表刷新'); */
        });
    }
  }

  /**
   * 学生高级查询
   * @param params
   */
  onEsHightSearch(reload= false) {
    this.studentLists = [];
    this.loading = true;
    if (reload) {
      this.page.Page = 1;
    }
    const queryParams = this
      .commonService
      .mapObject(this.searchObj);
    console.log(queryParams);
    this
      .http
      .POST({
        Router: '/api/squery/highquery/info',
        Method: 'POST',
        Body: Object.assign(queryParams, this.page)
      })
      .subscribe(res => {
        this.loading = false;
        if (!res.FeedbackCode) {
          if (res.Data) {
            this.studentLists = res.Data.Data;
            this.total = res.Data.Total || 0;
            this
              .studentLists
              .forEach(stu => {
                stu
                  .Highlight
                  .forEach(item => {
                    if (item.Key === '学号') {
                      stu.UserCode = item.Value || '学号为空';
                    }
                  });
              });
          }
        } else {
          this.loading = false;
          this.errText = res.FeedbackText;
        }

      });
  }
}

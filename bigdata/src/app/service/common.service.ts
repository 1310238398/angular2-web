import { NzMessageService } from 'ng-zorro-antd';
import {Injectable} from '@angular/core';
import {HttpService} from 'src/http/http.service';
import {Observable} from 'rxjs';

@Injectable()
export class CommonService {

  constructor(private msg: NzMessageService, private httpService: HttpService) {
  }

  loadBizCode(code): Observable<any> {
    return this
      .httpService
      .POST({
        Router: '/api/classinfo/parameterinit',
        Method: 'POST',
        Body: {
          parameter: [code]
        }
      });
  }

  /*校区*/
  loadCampus(): Observable<any> {
    return this
      .httpService
      .POST({Router: 'api/system/parameter/campusquery', Method: 'POST', Body: {}});
  }

  /*加载学院*/
  loadAcademy(): Observable<any> {
    return this
      .httpService
      .POST({Router: '/api/classinfo/academycascadeinit', Method: 'POST', Body: {}});
  }

  /*加载专业*/
  loadMajor(code): Observable<any> {
    return this
      .httpService
      .POST({
        Router: '/api/classinfo/majorcascadeinit',
        Method: 'POST',
        Body: {
          Academy: code
        }
      });

  }

  /*加载年级*/
  loadGade(): Observable<any> {
    return this
      .httpService
      .POST({Router: '/api/classinfo/gradecascadeinit', Method: 'POST', Body: {}});
  }

  /*加载班级*/
  loadClass(condition): Observable<any> {
    return this
      .httpService
      .POST({
        Router: '/api/classinfo/classcascadeinit',
        Method: 'POST',
        Body: {
          Campus: condition.Campus || '',
          Academy: condition.Academy || '',
          Major: condition.Major || '',
          Grade: condition.Grade || ''
        }
      });
  }

  /**
   * 获取省市县
   * @param {number} AreaType
   * @param {string} GeographyCode
   */
  getGeography(AreaType = '1', GeographyCode = ''): Observable<any> {
    return this
      .httpService
      .POST({
        Router: '/api/yxinfofill/geographyinit',
        Method: 'POST',
        Body: {
          AreaType: AreaType,
          GeographyCode: GeographyCode
        }
      });

  }

  /**
   * 返回不为null的对象
   */
  mapObject(obj) {
    const newObj = {};
    Object
      .keys(obj)
      .map(pro => {
        if (obj[pro]) {
          newObj[pro] = obj[pro].trim() || '';
        } else {
          newObj[pro] = obj[pro] || '';
        }

      });
    return newObj;
  }

  /**
   *
   * @param areacode
   */
  getAreaObj(areacode) {
    return {
      sheng: `${areacode.slice(0, 2)}0000`,
      shi: `${areacode.slice(0, 2)}${areacode.slice(2, 4)}00`,
      xian: areacode
    };
  }
  /**
   *
   * @param res
  */
  dealBack(res) {
    if (!res.FeedbackCode) {
      this.msg.success(res.FeedbackText);
    } else {
      this.msg.success(res.FeedbackText);
    }
  }
    /**
   * 学年
   */
  queryYear(): Observable<any> {
   return this
      .httpService
      .POST({
        Router: '/api/pc/assess/queryyear',
        Method: 'POST',
        Body: {}
      });
  }

  /**
   * 学院
   */
  queryAcademy(): Observable<any> {
  return  this
      .httpService
      .POST({
        Router: '/api/pc/assess/queryacademy',
        Method: 'POST',
        Body: {}
      });
  }
  /**
   * 获取所有部门(学院+组织)
   */
  queryAllDepartment(): Observable<any> {
  return  this
      .httpService
      .POST({
        Router: '/api/pc/bigdata/queryalldepartment',
        Method: 'POST',
        Body: {}
      });
  }
    /**
   * 获取下级部门(学院+组织)
   */
  parametercascadeinit(code= ''): Observable<any> {
    return  this
        .httpService
        .POST({
          Router: '/api/pc/bigdata/parametercascadeinit',
          Method: 'POST',
          Body: {code: code}
        });
    }

}

import {Injectable} from '@angular/core';

@Injectable()
export class CalcService {

  constructor() {}

  /**
   *
   * @param divisor 除数
   * @param dividend //被除数
   * @param  flag:true return float :false:'0%'
   */
  getRate(divisor, dividend, flag = true) {
    const iDivisor = parseInt(divisor || 0);
    const iDividend = parseInt(dividend || 0);
    if (iDivisor === 0 || iDividend === 0) {
      return flag === false
        ? '0%'
        : 0;
    }
    const val = iDivisor / iDividend * 100;
    if (flag === true) {
      return parseFloat(val.toFixed(3));
    }
    return val + '%';
  }

  /**
   *
   * @param property,order=>排序字段,升序,降序
   * @returns {(obj1, obj2) => number}
   */

  compare(property, order = 'desc') {
    console.log(property);
    return function (obj1, obj2) {
      const value1 = Number.parseInt(obj1[property]);
      const value2 = Number.parseInt(obj2[property]);
      if (order = 'asc') {
        return value1 - value1;
      } else {
        return value2 - value1; // 降序
      }
    };
  }
}

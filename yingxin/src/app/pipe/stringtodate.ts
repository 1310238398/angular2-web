/**
 * Created by hanzhendong on 2017/6/29.
 */
import {Pipe, Injectable, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stringToDate',
  pure: false
})

@Injectable()
export class StringToDatePipe implements PipeTransform {
  constructor() {
  }

  transform(value: string): any {
    if (value) {
      return moment(value, 'YYYYMMDD').format('M月DD日');
    } else {
      return ''
    }
  }
}

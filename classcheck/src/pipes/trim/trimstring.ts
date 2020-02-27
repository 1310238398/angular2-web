import {Pipe, PipeTransform} from '@angular/core';

/**
 *
 */
@Pipe({
  name: 'trim',
})
export class TrimStringPipe implements PipeTransform {
  /**
   * datetime
   */
  transform(value: string) {
    console.log(value)
    if (value.indexOf('老师')>-1) {
      return value.replace('老师', '');
    } else if (value.indexOf('学生')>-1) {
      return value.replace('学生', '');
    }else if (value.indexOf('班主任')>-1) {
      return value.replace('班主任', '');
    }else if (value.indexOf('分管领导')>-1) {
      return value.replace('分管领导', '');
    }
    else {
      return value
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pingyi'
})
export class PingyiPipe implements PipeTransform {


  transform(value: any, args?: any): any {

    if (value == args.Numb) {
      return `${(value / args.Numb * 100)}%`;
    } else if (value == '0') {
      return `${(value / args.Numb * 100)}%`;
    } else {
      return `${(value / args.Numb * 100).toFixed(2)}%`;
    }

  }







  // transform(value: any, args?: any): any {
  //   var temArr = value.split('|');
  //   if (!value || !temArr[1]) {
  //     return '未开始';
  //   }
  //   if (temArr[0] > 0) {
  //     return `${temArr[0]}分`;
  //   } else {
  //     return `已进行:${temArr[1] / args.Numb}%`;
  //   }
  // }

}

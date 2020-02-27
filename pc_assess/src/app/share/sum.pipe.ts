import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sumTotal'
})
export class SumPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(args);
    let total=0;
    if(args.IntelUserCode){
      total=parseInt(args.A1)+parseInt(args.A2)+parseInt(args.A4);
    }else {
      total=parseInt(args.A1)+parseInt(args.A2);
    }

    if (total>0) {
      return `${total}分`;
    }  else {
      return 0;
    }
  }

}

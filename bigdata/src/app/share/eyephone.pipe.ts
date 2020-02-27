import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'eyephone'
})
export class EyephonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return `${value.substring(0, 3)}****${value.substring(value.length-4)}`;
    }
  }

}
@Pipe({
  name: 'IdCardPipe'
})
export class IdCardPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return `${value.substring(0, 8)}*******${value.substring(value.length-4)}`;
    }
  }

}

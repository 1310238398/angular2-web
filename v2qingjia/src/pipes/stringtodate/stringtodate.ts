import { Pipe, PipeTransform } from '@angular/core';
declare  var moment;
/**
 * Generated class for the StringtodatePipe pipe.
 *
 */
@Pipe({
  name: 'stringToDate',
})
export class StringtodatePipe implements PipeTransform {
  /**
   * datetime
   */
  transform(value: string): Date {
    if(value){
      return moment(value).format('YYYY-MM-DD HH:mm');
    }
  }
}

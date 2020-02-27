import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gradePercent'
})
export class GradepercentPipe implements PipeTransform {

    transform(value: any,AllCount): any {
        console.log(AllCount);
        //value/gradeAllCount[gradeArr[index]
        if(AllCount>0){
            return (((value||0)/AllCount)*100).toFixed(2);

        }else {
            return '0.00';
        }
    }

}

@Pipe({
    name: 'stringTime'
})
export class StringTimePipe implements PipeTransform {

    transform(value): any {
        //value/gradeAllCount[gradeArr[index]
        var time= value?`${value.substring(0,4)}-${value.substring(4,6)}-${value.substring(6,8)} ${value.substring(8,10)}:${value.substring(10,12)}`:''
        return time;
    }

}

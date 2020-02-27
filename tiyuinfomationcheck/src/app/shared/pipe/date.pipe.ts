import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * 基于 moment 日期格式化，显示更多细节参考：
 *
 * @see http://momentjs.com/docs/#/displaying
 *
 * @example
 * ```html
 * {{ data | _data }}
 * 2017-09-17 15:35
 *
 * {{ data | _data: 'YYYY年MM月DD日' }}
 * 2017年09月17
 * ```
 * number为时间戳类型，秒
 */

@Pipe({ name: '_date' })
export class MomentDatePipe implements PipeTransform {
    transform(value: any, formatString: string = 'YYYY-MM-DD HH:mm'): string {
        if (typeof value === 'number') {
            return moment.unix(value).format(formatString);
        } else if (typeof value === 'string') {
            return moment(value).format(formatString);
        }
    }
}

// 最早的资讯类的时间，直接罗列的  20180511151631
@Pipe({ name: '_datestring' })
export class MomentDateStringPipe implements PipeTransform {
    transform(value: any, formatString: string = 'YYYY-MM-DD HH:mm'): string {
        if (!value) {
            return '';
        }
        if (formatString === 'YYYY-MM-DD') {
            const year = value.substring(0, 4);
            const month = value.substring(4, 6);
            const day = value.substring(6, 8);
            return year + '-' + month + '-' + day;
        } else if (formatString === 'YYYY-MM-DD HH:mm') {
            const year = value.substring(0, 4);
            const month = value.substring(4, 6);
            const day = value.substring(6, 8);
            const hour = value.substring(8, 10);
            const minute = value.substring(10, 12);
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        }

    }

}
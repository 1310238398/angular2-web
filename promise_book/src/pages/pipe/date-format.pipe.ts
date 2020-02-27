import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateformat' })
export class DateFormatPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        };

        if (value.length === 8) {
            value.substring(4, 6) + '-' + value.substring(6, 8);
        }
        if (value.length === 14) {
            console.log(value);
            return value.substring(4, 6) + '-' + value.substring(6, 8);
        }

    }
}
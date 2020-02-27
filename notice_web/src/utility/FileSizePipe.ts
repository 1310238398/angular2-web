import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'toReadableSize'})
export class FileSizePipe implements PipeTransform {
  transform(value: string): string {
    let size = parseInt(value);
    if (size <= 1024) {
        return size + "byte";
    } else if (size >1024 && size <= 1024 * 1024) {
        return Math.ceil(size/1024) + "KB";
    } else {
        return Math.ceil(size/1024/1024) + "MB";
    }
  }
}
    //assets/image/excel@2x.png
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
@Pipe({name: 'fileNameToTypeImageUrl'})
export class FileNameToUrlPipe implements PipeTransform {
  transform(fileName: string): string {
        console.log(fileName);
        if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
            return "assets/image/excel@2x.png";
        } else if (fileName.endsWith(".ppt") || fileName.endsWith(".pptx")) {
            return "assets/image/ppt@2x.png";
        } else if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
            return "assets/image/word@2x.png";
        } else if (fileName.endsWith(".zip")) {
            return "assets/image/zip@2x.png";
        } else {
            return "assets/image/file@2x.png";
        }
    }
}
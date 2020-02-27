import {Pipe, Injectable, PipeTransform} from '@angular/core';
import {  DomSanitizer } from '@angular/platform-browser'
@Pipe({
    name: 'keyword'
})
@Injectable()
export class KeywordPipe implements PipeTransform {
    constructor(private sanitizer:DomSanitizer){}
    transform(val: string, keyword: string):any {

        let Reg=new RegExp(keyword,"gi");
        if(val){
            let res = val.replace( Reg,`<span style="color: #ffc000;">${keyword}</span>`);
            return this.sanitizer.bypassSecurityTrustHtml(res);
        }
    }
}

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable()
export class CheckMenuFieldService {

    constructor() { }

    // 校验空格
    checkSpace = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return;
        } else if (control.value.length > 0 && control.value.trim().length === 0) {
            return { space: true, error: true };
        } else {
            const reg1 = new RegExp("<style[^>]*?>(\\s*?|.*?)*?</style>", "gi");    // 标签的正则表达式
            const reg2 = new RegExp("<script[^>]*?>(\\s*?|.*?)*?</script>", "gi");    // 标签的正则表达式
            const reg3 = new RegExp("<[^<]*>", "gi");    // 标签的正则表达式
            const reg4 = new RegExp("[\\n\\r]*");    // 标签的正则表达式
            let tempText = control.value.replace(reg1, "").replace(reg2, "").replace(reg3, "").replace(reg4, "");
            tempText = tempText.replace(/&nbsp;/ig, "").trim();
            if (tempText.length === 0) {
                return { space: true, error: true };
            }
        }
    }

    // 文件列表,管理端

}
/**
 * Created by hanzhendong on 2017/10/20.
 */
import { URLSearchParams } from '@angular/http';

/**
 * 将object转换为URLSearchParams
 *
 * @param input 需要转换的object值.
 */
export function objectToURLSearchParams(input: any) {
    let result = new URLSearchParams();
    if (input == null)
        return result;

    Object.keys(input).forEach(key => {
        const val = input[key];

        if (Array.isArray(val)) {
            for (let element of val) {
                result.append(key, valToString(element));
            }
        } else {
            result.append(key, valToString(val));
        }
    });

    return result;
}

function valToString(val: any) {
    if (val == null)
        return '';
    else if (val instanceof Date)
        return val.toISOString();
    else
        return val.toString();
}
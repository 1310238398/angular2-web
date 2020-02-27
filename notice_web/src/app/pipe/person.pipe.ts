import {Pipe, Injectable, PipeTransform} from '@angular/core';

@Pipe({
    name: 'personPipe'
})
@Injectable()
export class PersonPipePipe implements PipeTransform {
    constructor() {
    }

    transform(items: any[]): any {
        console.log(items);
    }
}

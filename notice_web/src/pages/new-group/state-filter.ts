// *ngIf="chatFriend.STATE===0 || chatFriend.STATE===1 ? true : false"
import { Pipe, PipeTransform, Injectable } from '@angular/core';

import { GroupMember } from "../../utility/GroupMember";

@Pipe({
    name: 'stateFilter',
    pure: false
})
@Injectable()
export class StateFilterPipe implements PipeTransform {
    transform(items: GroupMember[], args: number[]): GroupMember[] {
        // console.log(JSON.stringify(args));
        // console.log(JSON.stringify(items));
        if (items === undefined) {
            return [];
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => {
            //item.title.indexOf(args[0].title) !== -1
            for (let i = 0; i < args.length; ++i) {
                if (item.STATE === args[i]) {
                    return true;
                }
            }
            return false;
        });
    }
}
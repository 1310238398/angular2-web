import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { HelpUtils } from '../../app/utils/HelpUtils';

@NgModule({
    declarations: [
        SearchPage
    ],
    imports: [
        IonicPageModule.forChild(SearchPage)
    ],
    entryComponents: [
        SearchPage
    ],
    providers: [HelpUtils]
})
export class SearchModule { }

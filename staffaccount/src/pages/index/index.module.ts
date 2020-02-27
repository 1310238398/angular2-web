import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexPage } from './index';
import { HelpUtils } from '../../app/utils/HelpUtils';
import { SelectSearchableModule } from 'ionic-select-searchable';
@NgModule({
    declarations: [
        IndexPage
    ],
    imports: [
        SelectSearchableModule,
        IonicPageModule.forChild(IndexPage)
    ],
    entryComponents: [
        IndexPage
    ],
    providers:[HelpUtils]
})
export class IndexPageModule { }

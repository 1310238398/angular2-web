import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnitListPage } from './unitlist';
import { HelpUtils } from '../../../app/utils/HelpUtils';

@NgModule({
    declarations: [
        UnitListPage
    ],
    imports: [
        IonicPageModule.forChild(UnitListPage)
    ],
    entryComponents: [
        UnitListPage
    ],
    providers:[HelpUtils]
})
export class UnitListPageModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoListPage } from './infolist';
import { HelpUtils } from '../../app/utils/HelpUtils';
@NgModule({
    declarations: [
        InfoListPage
    ],
    imports: [
        IonicPageModule.forChild(InfoListPage)
    ],
    entryComponents: [
        InfoListPage
    ],
    providers:[HelpUtils]
})
export class InfoListPageModule { }

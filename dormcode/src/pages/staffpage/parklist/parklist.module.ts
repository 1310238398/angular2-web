import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkListPage } from './parklist';
import { HelpUtils } from '../../../app/utils/HelpUtils';

@NgModule({
    declarations: [
        ParkListPage
    ],
    imports: [
        IonicPageModule.forChild(ParkListPage)
    ],
    entryComponents: [
        ParkListPage
    ],
    providers:[HelpUtils]
})
export class ParkListPageModule { }

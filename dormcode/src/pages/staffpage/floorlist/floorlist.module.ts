import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorListPage } from './floorlist';
import { HelpUtils } from '../../../app/utils/HelpUtils';

@NgModule({
    declarations: [
        FloorListPage
    ],
    imports: [
        IonicPageModule.forChild(FloorListPage)
    ],
    entryComponents: [
        FloorListPage
    ],
    providers:[HelpUtils]
})
export class FloorListPageModule { }

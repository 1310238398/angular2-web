import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadrePage } from './cadre';
import { HelpUtils } from '../../../app/utils/HelpUtils';
@NgModule({
    declarations: [
        CadrePage
    ],
    imports: [
        IonicPageModule.forChild(CadrePage)
    ],
    entryComponents: [
        CadrePage
    ],
    providers:[HelpUtils]
})
export class CadreModule { }

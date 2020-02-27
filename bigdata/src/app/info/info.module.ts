import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { InfoComponent } from './info.component';
import { InfoRoutes } from './info.routing';
import { MessageComponent } from './message/message.component';
import { ModalHelper } from '../share/modalHelper';
import {EyephonePipe, IdCardPipe} from '../share/eyephone.pipe';
import {CommonService} from '../service/common.service';
import { GeographyModule } from '../component/geography/geography.module';
import {InfoService} from './Info.service';
import { FamilyEditComponent } from './family-edit/family-edit.component';
import {BizcodeModule} from '../component/bizcode/bizcode.module';
import { ScholarshipaidEditComponent } from './scholarshipaid-edit/scholarshipaid-edit.component';
import { HonourEditComponent } from './honour-edit/honour-edit.component';
import { SpecialcharacterEditComponent } from './specialcharacter-edit/specialcharacter-edit.component';
import { PunishmentEditComponent } from './punishment-edit/punishment-edit.component';
import { SafetyincidentEditComponent } from './safetyincident-edit/safetyincident-edit.component';
import { CadreEditComponent } from './cadre-edit/cadre-edit.component';
import { StatusEditComponent } from './status-edit/status-edit.component';
const components = [MessageComponent, FamilyEditComponent, CadreEditComponent, StatusEditComponent, ScholarshipaidEditComponent,
  HonourEditComponent, SpecialcharacterEditComponent, PunishmentEditComponent, SafetyincidentEditComponent];
@NgModule({
  imports: [
    SharedModule,
    InfoRoutes,
    GeographyModule,
    BizcodeModule
  ],
  declarations: [InfoComponent,  EyephonePipe, IdCardPipe, ...components],
  entryComponents: [...components],
  providers: [ModalHelper, CommonService, InfoService]

})
export class InfoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

// 组件
// import {AcademynodoComponent} from './academynodo/academynodo.component'
import { ApartmentlistComponent } from './apartmentsearchlist/apartmentlist.component';


// 路由
// import { ApartmentSearchRoutingModule } from './apartment-routing.module';
import { ApartmentSearchRoutingModule } from './apartment-routing.module';

@NgModule({
  imports: [
    ApartmentSearchRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,

  ],
  declarations: [
      ApartmentlistComponent, 
    // AcademynodoComponent,
  ],

  exports: [RouterModule],
  providers: [CommonService]
})
export class ApartmentSearchModule { }

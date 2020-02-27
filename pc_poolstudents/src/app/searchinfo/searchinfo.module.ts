import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { CommonService } from "../service/common.service";
import { RouterModule } from "@angular/router";

import { HttpService } from '../../http/http.service';

import { SearchInfoRoutingModule } from "./searchinfo-routing.module";
import { SearchIndexComponent } from "./searchindex/searchindex.component";



@NgModule({
  imports: [
    SearchInfoRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    SearchIndexComponent,
  ],
  exports: [RouterModule],
  providers: [CommonService, HttpService],

})
export class SearchInfoModule { }

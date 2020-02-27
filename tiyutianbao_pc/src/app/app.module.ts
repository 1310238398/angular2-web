import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpService } from "../http/http.service";
import { DatePipe } from "@angular/common";
// import { FamilyEditComponent } from "./family-edit/family-edit.component";
// import { MessageComponent } from "./message/message.component";
import {EyephonePipe} from "./share/eyephone.pipe"
import {IdCardPipe} from "./share/eyephone.pipe"
// import { ENgxViewerModule } from "e-ngx-viewer";






@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    // ENgxViewerModule,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    // FamilyEditComponent,
    // MessageComponent,
    EyephonePipe,
    IdCardPipe

    
  ],
  providers: [HttpService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }



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




@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    AppComponent,

    
  ],
  providers: [HttpService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }



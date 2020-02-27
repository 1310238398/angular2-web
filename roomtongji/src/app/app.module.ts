import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
// import { SimpleRouteReuseStrategy } from './simpleRouteReuseStrategy';
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
    AppComponent
  ],
  bootstrap: [AppComponent]
  // providers:[
  //   { provide: RouteReuseStrategy, useClass: SimpleRouteReuseStrategy }
  // ]
})
export class AppModule { }



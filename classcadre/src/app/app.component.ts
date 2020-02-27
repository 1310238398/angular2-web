import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Nav } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;
  rootPage:string = 'page-cadre';

  constructor(
    private httpServise: HttpService
  ) {}
}
import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http/http.service";
import {ServelUrl} from "./ServelUrl";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
  }


}

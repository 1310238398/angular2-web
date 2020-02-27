import {Component, OnInit} from '@angular/core';
import { NgModule } from "@angular/core";


@Component({selector: 'app-message', templateUrl: './message.component.html', styleUrls: ['./message.component.less']})
export class MessageComponent implements OnInit {
  data : any;
  StayInfo = [];
  type : any;
  constructor() {}

  ngOnInit() {
    if (this.type == 'StayInfo') {
      this
        .StayInfo
        .push(this.data);
    }
    console.log(this.data);
  }
}

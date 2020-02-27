import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.less']
})
export class FamilyEditComponent implements OnInit {
  params={
    MemberType:'',
    Country:''
  };

  constructor() {
  }

  ngOnInit() {
    console.log(this.params);
  }

  save() {
    console.log(this.params)
  }

  close() {
    console.log(this.params)
  }
}

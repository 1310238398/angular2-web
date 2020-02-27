import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ant-bizcode',
  templateUrl: './bizcode.component.html',
  styleUrls: ['./bizcode.component.less']
})
export class BizcodeComponent implements OnInit {
  @Input() bizObj;
  @Input() BizType;
  @Input() ModelName;
  @Input() mode;
  @Input() PlaceHolder;
  biztypes = [];
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this
      .commonService
      .loadBizCode(this.BizType)
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.biztypes = res.Data || [];
        }

      });
  }

}

import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {CommonService} from '../../service/common.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ant-geography',
  templateUrl: './geography.component.html',
  styleUrls: ['./geography.component.less']
})
export class GeographyComponent implements AfterViewInit {
  @Input() geoObj;
  @Input() areaCode;
  sheng;
  shi;
  xian;

  constructor(private commonService: CommonService) {
  }

  ngAfterViewInit() {
    this.loadSheng();
    if (this.areaCode) {
      console.log('this.areaCode', this.areaCode);
      const geoObj = this.commonService.getAreaObj(this.areaCode);
      this.geoObj.sheng = geoObj.sheng;
      this.geoObj.shi = geoObj.shi;
      this.geoObj.xian = geoObj.xian;
      this.loadShi(geoObj.sheng);
      this.loadXian(geoObj.shi);
    }
  }

  /*加载省*/
  loadSheng() {
    this
      .commonService
      .getGeography()
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.sheng = res.Data || [];
        }
      });
  }

  /*加载市*/
  loadShi(GeographyCode) {
    if (GeographyCode) {
      this
        .commonService
        .getGeography('2', GeographyCode)
        .subscribe(res => {
          if (!res.FeedbackCode) {
            this.shi = res.Data || [];
          }
        });
    }

  }

  /*加载县*/
  loadXian(GeographyCode) {
    if (GeographyCode) {
      this
        .commonService
        .getGeography('3', GeographyCode)
        .subscribe(res => {
          if (!res.FeedbackCode) {
            this.xian = res.Data || [];
          }
        });
    }
  }

  onSelect(type) {
    switch (type) {
      case 'sheng':
        this.geoObj['shi'] = null;
        this.geoObj['xian'] = null;
        this.loadShi(this.geoObj['sheng']);
        break;
      case 'shi':
        this.geoObj['xian'] = null;
        this.loadXian(this.geoObj['shi']);
        break;
    }

  }

}

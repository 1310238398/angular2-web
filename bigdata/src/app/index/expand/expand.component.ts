import {Component} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {CalcService} from 'src/app/service/calc.service';
import {Router} from "@angular/router";

declare var echarts: any;

@Component({
  selector: 'app-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.less']
})
export class ExpandComponent implements AfterViewInit {

  SbiStatus = [];
  SbiNationality = [];
  SbiPolitical = [];
  academy='';
  constructor(private router: Router, private modal: NzModalRef, private calcService: CalcService) {
  }

  ngAfterViewInit() {
    this.modal.afterOpen.subscribe(item => {
      console.log(document.getElementById('ModalSbiPoliticalId'));
      if (this.SbiStatus.length) {
        this.setSbiStatus(this.SbiStatus);
      }
      if (this.SbiNationality.length) {
        this.setSbiNationality(this.SbiNationality);
      }
      if (this.SbiPolitical.length) {
        this.setSbiPolitical(this.SbiPolitical);
      }
    });

  }

  /**
   * 民族统计
   * @param SbiNationality
   */
  setSbiNationality(SbiNationality) {
    let sum = 0;
    SbiNationality.forEach(ele => {
      sum += parseInt(ele.Value || 0, 10);
    });
    SbiNationality.forEach(element => {
      element.Rate = this
        .calcService
        .getRate(element.Value, sum);
    });
  }
  /**
   * 学生状态
   * @param SbiStatus
   */
  setSbiStatus(SbiStatus) {
    let sum = 0;
    SbiStatus.forEach(ele => {
      sum += parseInt(ele.Value || 0, 10);
    });
    SbiStatus.forEach(element => {
      element.Rate = this
        .calcService
        .getRate(element.Value, sum);
    });
  }

  /**
   *
   * @param value
   */
  onJump(type, value,academy) {
    this.modal.destroy();
    this
      .router
      .navigate(['/student'], {
        queryParams: {
          searchValue: value || '',
          academy:academy||'',
          QType: type
        }
      });

  }

  /**
   * 政治面貌统计
   * @param SbiPolitical
   */
  setSbiPolitical(SbiPolitical) {
    const Datas = SbiPolitical.map(item => {
      return {name: item.Key, value: item.Value};
    });
    const nameList = SbiPolitical.map(item => item.Key);

    console.log(nameList);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 25,
        bottom: 20,
        data: nameList
      },
      series: [
        {
          name: '政治面貌',
          type: 'pie',
          radius: [
            '60%', '70%'
          ],
          center: [
            '33%', '40%'
          ],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '24',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: Datas
        }
      ]
    };
    const myChart = echarts.init(document.getElementById('ModalSbiPoliticalId'), 'antlinker');
    myChart.setOption(option);
    myChart.on('click', (params) => {
      this.onJump('Political', params.name,this.academy);
    });
  }
}

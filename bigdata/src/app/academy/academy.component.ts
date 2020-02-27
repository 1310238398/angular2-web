import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http/http.service';
import {Router} from '@angular/router';

declare var echarts;

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.less']
})
export class AcademyComponent implements OnInit {
  academyBar;
  Logo='';
  Campus='';
  constructor(private router: Router, private http: HttpService) {
  }

  ngOnInit() {
    this
      .http
      .POST({Router: '/api/pc/bigdata/academydata', Method: 'POST', Body: {}}).subscribe(res => {
      console.log(res);
      this.setAcademyBar(res.Data || []);
    });
    this.getSchoolIcon();
  }

  /**
   * 学院统计
   * @param USex
   */
  setAcademyBar(_data) {
    let nameList = [];
    let data = []
    _data.forEach(academy => {
      nameList.push(academy.Key);
      data.push(academy.Value);
    });
    const option = {
      color: ['#13a0fa'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          splitLine: {show: false},//去除网格线
          data: nameList,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            rotate: 40,
            interval: 0,
            fontSize: 12
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '人数',
          type: 'bar',
          barWidth: '60%',
          data: data,
          itemStyle: {
            normal: {
              label: {
                show: true,
                textStyle: {
                  fontWeight: 'bolder',
                  fontSize: '12',
                  fontFamily: '微软雅黑'
                },
                position: 'top'
              }
            }
          }
        }
      ]
    };

    this.academyBar = echarts.init(document.getElementById('bar-academy'), 'antlinker');
    this.academyBar.setOption(option);
    // 处理点击事件并且跳转
    this.academyBar.on('click', (params) => {
      console.log(params);
      this
        .router
        .navigate(['/'], {
          queryParams: {
            academy: params.name
          }
        });
    });
  }
  /**
   * 获取头像
   */
  getSchoolIcon(){
    this
      .http
      .POST({Router: '/api/yxinfofill/getschoollogoandname', Method: 'POST', Body: {}}).subscribe(res=>{
      console.log(res,'icon')
      this.Campus=res.Data.Campus||'';
      this.Logo=res.Data.Logo||'';
    })
  }
  onResize(event) {
    // 学院重置
    this.academyBar.resize();
  }
}

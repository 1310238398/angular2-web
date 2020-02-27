import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AppService, FlyPeople, FlyAcademy, AcademyElem } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({ transform: 'translateX(-100%)' })),
      transition('void => *', [
        style({

          transform: 'translateX(100%)'
        }),
        animate('15s ease-in')
      ])

    ]),
    trigger('onechange', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in')
      ]),
      transition('in => out', [
        style({ transform: 'translateX(0)' }),
        animate('1s ease-in')
      ]),
      transition('out => in', [
        style({ transform: 'translateX(0)' })
      ])
    ]),
    trigger('twochange', [
      state('in', style({ transform: 'translateX(-100%)' })),
      state('out', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(0)' }),
        animate('500ms ease-in')
      ]),
      transition('out => in', [

        animate('1s ease-in')
      ]),
      transition('in => out', [
        style({ transform: 'translateX(0)' })
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  checkInStatus: number;
  campusLogo: string;
  campusName: string;
  reportedNum: number;
  recruitNum: number;
  reportedRate: string;
  peoples: any[] = [];
  academyMap: Map<string, AcademyElem> = new Map<string, AcademyElem>();
  academys: AcademyElem[] = [];
  acadeNum: number = 0;
  flysinit: FlyPeople[] = [];
  pos: number = 15;
  kflys: FlyPeople[] = [];
  cnt: number = 0;
  state = 'in';
  pAcademys: FlyAcademy[] = [];
  academysPos: number = 4;
  showPos: number = 0;
  time = '';
  currentMonth='';
  currentDay='';
  currentDate='';
  currentHours = '';
  currentMinutes = '';
  currentSeconds = '';
  ngOnInit(): void {
    // 取当前时间
    this.setTime();

    for (let i = 0; i < this.pos; i++) {
      this.flysinit[i] = new FlyPeople(i);
      this.kflys.push(this.flysinit[i]);
    }


    // 报到状态
    this.getRegStatus();

    // 校名、校徽
    this.getCampus();

    // 实时报到数据
    this.getCheckInDetails();
    this.loopShow();
    // this.loopTest();
    setTimeout(() => {
      for (let i = 0; i < this.academysPos; i++) {
        this.pAcademys[i] = new FlyAcademy(i);
      }
      this.TestAcademys();
    }, 1010);

  }
  constructor(private appservice: AppService, private titleService: Title) { }

  chgStatus(): void {
    this.state === 'in' ? this.state = 'void' : this.state = 'in';
  }


  // 报到状态
  getRegStatus(): void {
    this.appservice.queryRegStatus().then(
      res => {
        this.checkInStatus = res.Data.CheckinStatus;
        setTimeout(() => {
          this.getRegStatus();
        }, 10000);
      });
  }

  // 校名、校徽
  getCampus(): void {
    this.appservice.queryCampus().then(
      res => {
        this.titleService.setTitle(res.Data.CampusName + '报到情况展示');
        this.campusLogo = res.Data.CampusLogo;
        this.campusName = res.Data.CampusName;
      });
  }

  // 实时报到数据
  getCheckInDetails(time?: string): void {
    this.appservice.queryCheckDetails(time).then(
      res => {
        if (res.Data) {
          this.reportedNum = res.Data.ReportedNum;
          this.reportedRate = res.Data.ReportedRate;
          if (res.Data.Peoples && res.Data.Peoples.length > 0) {
            this.addPeoples(res.Data.Peoples);
          }
          if (res.Data.Academys && res.Data.Academys.length > 0) {
            this.acadeNum = res.Data.Academys.length;
            this.fullacademys(res.Data.Academys);
          }
          if (res.Data.Time) {
            this.time = res.Data.Time;
          }


          setTimeout(() => {
            console.log(`time++++${this.time}`);
            this.getCheckInDetails(this.time);
          }, 1000);
        }
      });
  }
  addPeoples(peoples: any[]): void {
    if (!!peoples && peoples.length > 0) {
      for (let i = 0; i < peoples.length; i++) {
        this.peoples.push(peoples[i]);
      }
    }
  }

  loopTest(): void {

    setTimeout(() => {
      const r = Math.random() * 10;
      for (let i = 0; i < r; i++) {
        this.addPeoples([{ AcademyName: '公共卫生学院', Name: '王太平' + (this.cnt) }]);
        this.cnt++;
      }
      this.loopTest();
    }, Math.random() * 1000 + 1000);
  }
  loopShow(): void {
    setTimeout(() => {
      this.showOneFly();
      this.loopShow();
    }, 1010);
  }
  showOneFly(): void {
    if (this.peoples.length === 0 || this.kflys.length === 0) {
      return;
    }
    const p = this.peoples.shift();
    const k = this.kflys.shift();
    k.AcademyName = p.AcademyName;
    k.Name = p.Name;
    k.State = 'in';
    k.Show = true;

  }

  showEnd(k: FlyPeople): void {
    if (k.Show) {
      k.Show = false;
      k.State = 'void';
      this.kflys.push(k);
    }
  }

  fullacademys(ac: AcademyElem[]): void {
    for (let i = 0; i < ac.length; i++) {
      // const t = Math.ceil(Math.random() * 400);
      // const r = t > 20 ? t - 10 : t;
      const k = i + '';
      if (this.academyMap.has(k)) {
        const a = this.academyMap.get(k);
        a.AcademyCode = ac[i].AcademyCode;
        a.AcademyName = ac[i].AcademyName;
        a.RecruitNum = ac[i].RecruitNum;
        a.ReportedNum = ac[i].ReportedNum;
        a.ReportedRate = ac[i].ReportedRate + '%';

      } else {
        // const ae = new AcademyElem('', '', 0, 0, '');

        this.academyMap.set(k, ac[i]);
        this.academys.push(ac[i]);
      }
    }
  }

  TestAcademys(): void {
    this.flushAcademys();
    setTimeout(() => {
      this.TestAcademys();
    }, 6000);
  }

  flushAcademys(): void {
    let start = this.showPos;
    for (let i = 0; i < this.academysPos / 2; i++) {

      this.showAcademy(this.pAcademys[i], this.academys[this.showPos]);
      this.showPos++;
      if (this.showPos >= this.acadeNum) {
        this.showPos = 0;
      }
      this.showAcademy(this.pAcademys[i + this.academysPos / 2], this.academys[this.showPos]);
      this.showPos++;
      if (this.showPos >= this.acadeNum) {
        this.showPos = 0;
      }
    }
    this.showPos = start + 2;
    if (this.showPos >= this.acadeNum) {
      this.showPos = 0;
    }
  }

  showAcademy(a: FlyAcademy, aca: AcademyElem): void {
    a.next(aca);
  }

  // 设置时间
  setTime() {
    const nowdate = new Date();
    // 获取年月日时分秒
    const year = nowdate.getFullYear();
    this.currentMonth = nowdate.getMonth() >= 10 ? nowdate.getMonth() + '' : '0' + nowdate.getMonth();
    this.currentDay = nowdate.getDay()+'';
    this.currentDate = nowdate.getDate() >= 10 ? nowdate.getDate() + '' : '0' + nowdate.getDate();
    this.currentHours = nowdate.getHours() >= 10 ? nowdate.getHours() + '' : '0' + nowdate.getHours();
    this.currentMinutes = nowdate.getMinutes() >= 10 ? nowdate.getMinutes() + '' : '0' + nowdate.getMinutes();
    this.currentSeconds = nowdate.getSeconds() >= 10 ? nowdate.getSeconds() + '' : '0' + nowdate.getSeconds();

    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    setTimeout(() => {
      this.setTime();
    }, 1000);
  }
}
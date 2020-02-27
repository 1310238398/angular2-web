import {Router, Params, ActivatedRoute} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../../../http/http.service';
import {ServelUrl} from "../../../ServelUrl";
import {NzMessageService} from "ng-zorro-antd";
declare var $;
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-resultDetail',
  templateUrl: './resultdetails.component.html',
  styleUrls: ['./resultdetails.component.css']
})
export class ResultDetailComponent implements OnInit {
  public show: boolean = true;

  public slides = [
    // 'First slide',
    // 'Second slide',
    // 'Third slide',
    // 'Fourth slide',
    // 'Fifth slide',
    // 'Sixth slide'
  ];

  public type: string = 'component';
  index = 1;

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  constructor(private httpService: HttpService, private router: ActivatedRoute, private route: Router, private msvg: NzMessageService) {
  }

  taskId: '';
  dorm: '';
  room: '';
  roomId: '';
  checker: '';
  creator: '';
  questionId: '';
  time;
  reason;
  isVisible = false;
  dataSet = [
    // {name: '你好',
    // Context: '太脏',
    // Score: '5',
    // Reason: '脏',}
  ]


  titleWeek = '';
  titleType: '';

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {

      this.taskId = params['taskid'];
      this.roomId = params['roomId'];
      this.creator = params['creator'];
      this.questionId = params['questionnaire_id'];
      this.time = params['time'];

      this.dorm = params['dorm'];
      this.room = params['room'];
      this.checker = params['checker'];
    })
    this.scoreDetails();
    this.one();
  }

  // 分值明细
  scoreDetails() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.resultdetail,
      Method: 'POST',
      Body: {
        bu_type: this.taskId,
        bu_id: this.roomId,
        questionnaire_code: 'antlinker-ssjc',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.Data.result;
        this.reason = res.Data.reason;
        this.slides = res.Data.attach;
      }
    })
  }

  watchAttach() {
    $('#img-pre').viewer();
  }

  attach(data) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.resultattach,
      Method: 'POST',
      Body: {
        ResultId: data.ResultId
        // ResultId: '107606e0-e4b6-431e-9173-a9a24652add1'
      }
    }).then(res => {
      this.slides = res.Data;
      this.isVisible = true;
    })
    // this.isVisible = true;
  }

  one() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.previewPageTitle,
      Method: 'POST',
      Body: {
        TaskId: this.taskId
      }
    }).then(res => {
      this.titleWeek = res.Data.Weeks;
      this.titleType = res.Data.Type;
      this.time=res.Data.StartDate||"";
    })
  }

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleDirection(): void {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls(): void {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }

    if (this.type === 'directive') {
      this.directiveRef.setIndex(0);
    } else {
      this.componentRef.directiveRef.setIndex(0);
    }
  }

  public toggleKeyboardControl(): void {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number): void {
    if (this.index >= this.slides.length) {
      this.index = 1;
    } else {
      this.index = index + 1;
    }

  }


  handleCancel() {
    this.isVisible = false;
  }

  // 返回
  return() {
    this.route.navigate(['./dormitorycheck/result', {taskId: this.taskId}])
  }
}

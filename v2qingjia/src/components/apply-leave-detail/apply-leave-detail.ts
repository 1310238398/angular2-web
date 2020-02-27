import {Component, Input} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ServelUrl} from "../../app/ServelUrl";
import {HelpUtils} from "../../app/utils/HelpUtils";
import {HttpService} from "../../http/http.Service";

/**
 *
 * Components.
 */
declare var antlinker;

@Component({
  selector: 'applyleave-detail',
  template: `
    <ion-card padding-bottom>
      <ion-card-content>
        <div>
          <div padding-bottom>尊敬的老师：</div>
          <div class="zj-text-indent">本人因<span>{{leaveApply.LeaveReason}}</span>，需请<span>{{LeaveType.CodeName}}</span>，从
            <span>{{leaveApply.StartDate | stringToDate}}（{{StartWeekDay}}）第{{leaveApply.StartCourse}}节课</span>至<span>{{leaveApply.EndDate | stringToDate}}（{{EndWeekDay}}）第{{leaveApply.EndCourse}}节课</span>
            共计<span>{{Days}}</span>天，不能参加累计<span>{{leaveApply.ClassNum}}</span>节课程的学习。
          </div>
          <div class="zj-text-indent">请假期间，本人将去往<span>{{OutPlace.CodeName}}</span>，
            详细地址为：<span>{{leaveApply.DetailAddress}}</span>，联系人：<span>{{leaveApply.EmergencyPerson}}</span>，
            联系电话:<span class="line"
                       (click)="call(leaveApply.EmergencyNumber,leaveApply.EmergencyPerson)">{{leaveApply.EmergencyNumber}}</span>。
          </div>
          <div class="zj-text-indent">本人承诺请假期间严格遵守国家法律法规和校纪校规相关规定，
            不参加任何非法游行、集体活动，一切安全事故责任自负，按时返校销假，请准假！
          </div>
          <!--  <span *ngFor="let item of leaveApply.EvidenceUrl" style="width: 27px;height: 24px">

               <img src="{{item}}">
            </span>-->

          <span *ngIf="imgFlag"><img [src]="DomSanitization.bypassSecurityTrustUrl(filesrc)"></span>
          <span *ngIf="!imgFlag">{{leaveApply?.Evidence?.name}}</span>

          <div padding-top style="float: right">
            <div>请假人：{{UserInfo.Name}}</div>
            <div>学院：{{UserInfo.AcademyName}}</div>
            <div>班级：{{UserInfo.ClassName}}</div>
            <div>学号：{{UserInfo.UserCode}}</div>
            <div>日期：{{applyDate | stringToDate }}</div>

          </div>
        </div>

      </ion-card-content>
    </ion-card>`,
  styles: [`
    .line {
      text-decoration: underline;
    }
  `]
})
export class ApplyLeaveDetailComponent {

  self_leaveApply;
  filesrc;
  imgFlag: boolean;
  Days;
  StartWeekDay;
  EndWeekDay;
  LeaveType;
  OutPlace;
  @Input() UserInfo;

  @Input()
  set leaveApply(leaveApply) {
    console.log(leaveApply.Evidence);
    if (this.isJSON(leaveApply.LeaveType)) {
      this.LeaveType = JSON.parse(leaveApply.LeaveType)
    } else {
      this.LeaveType = leaveApply.LeaveType
    }
    if (this.isJSON(leaveApply.OutPlace)) {
      this.OutPlace = JSON.parse(leaveApply.OutPlace)
    } else {
      this.OutPlace = leaveApply.OutPlace
    }

    if (typeof (leaveApply.Evidence) === 'string') {
      if (leaveApply.Evidence) {
        this.http.postJSON({
          Router: ServelUrl.Url.QueryLeaveApplicationPhoto,
          Method: 'POST',
          Body: {
            Evidence: leaveApply.Evidence
          }
        }).then(
          comments => {
            if (!comments.FeedbackCode) {
              /*     var img = new Image();
                   img.crossOrigin="anonymous";
                   img.onload = () => {
                     var width = img.width;
                     var height = img.height;
                     var canvas = document.createElement("canvas");
                     var context = canvas.getContext('2d');
                     canvas.width = width;
                     canvas.height = height;
                     // 绘制图片
                     context.drawImage(img, 0, 0);
                     context.font = "24px PingFangSC-Regular";
                     context.fillStyle = "rgba(255, 0, 0,0.5)";
                     context.fillText(`提交时间：${leaveApply.ApplyDate}`, width - 260, height - 20);
                     this.filesrc = canvas.toDataURL('image/jpeg');

                   };*/
              //img.src =comments.Data.URL;
              this.filesrc = comments.Data.URL;
              this.imgFlag = true;
            }
          });
      } else {
        if (leaveApply.imgURL) {
          this.filesrc = leaveApply.imgURL;
          this.imgFlag = true;
        } else {
          this.imgFlag = false;
        }
      }
    } else {
      if (leaveApply.Evidence.type == 'image/png' || leaveApply.Evidence.type == 'image/jpeg' || leaveApply.Evidence.type == 'image/jpg' || leaveApply.Evidence.type == 'image/gif') {
        this.imgFlag = true;
      } else {
        if (leaveApply.imgURL) {
          this.filesrc = leaveApply.imgURL;
          this.imgFlag = true;
        } else {
          this.imgFlag = false;
        }
      }

      let reader = new FileReader();
      reader.onload = () => {
        this.filesrc = reader.result
        /*if (leaveApply.ApplyDate) {
          var img = new Image();
          img.onload = () => {
            var width = img.width;
            var height = img.height;
            var canvas = document.createElement("canvas");
            var context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            // 绘制图片
            context.drawImage(img, 0, 0);
            context.font = "24px PingFangSC-Regular";
            context.fillStyle = "rgba(255, 0, 0,0.5)";
            context.fillText(`${leaveApply.ApplyDate || '44444'}`, width - 140, height - 10);
            this.filesrc = canvas.toDataURL('image/jpeg');

          };
          img.src = reader.result;
        }else {
          this.filesrc = reader.result
        }*/
      };
      reader.readAsDataURL(leaveApply.Evidence);
    }
    this.Days = this.HelpUtils.getDays(leaveApply.StartDate, leaveApply.EndDate);
    this.StartWeekDay = this.HelpUtils.getWeekDay(leaveApply.StartDate);
    this.EndWeekDay = this.HelpUtils.getWeekDay(leaveApply.EndDate);
    this.self_leaveApply = leaveApply;
  }

  get leaveApply() {
    return this.self_leaveApply;
  }

  isJSON(str) {
    if (typeof str == 'string') {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        //console.log(e);
        return false;
      }
    }
  }

  @Input() applyDate;

  constructor(private http: HttpService, private HelpUtils: HelpUtils, private DomSanitization: DomSanitizer) {

  }

  call(phone, Name) {
    //alert(phone);
    // alert(Name);
    if (phone) {
      antlinker.onTel(
        {
          tel: phone.toString(),
          text: Name,
          fail: () => {
          },
          success: () => {
          }
        }
      );
    }

  }

}

/**
 * Created by hanzhendong on 2018/02/08.
 */
import {PopoverController, ToastController} from "ionic-angular";

declare var antlinker;
import {Component, Input, ViewChild} from "@angular/core";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'yd-Steps',
  template: `
    <ion-card>
      <ion-card-content style="padding-left: 0px">
        <ul>
          <li *ngFor="let step of Steps;let index=index" [ngClass]="{'tag':step.Status==1}">
            <div class="user">{{step.Name || '  '}} ({{step.NodeName}})</div>
            <div [ngSwitch]="step.Status">
              <img *ngSwitchCase="2" src="assets/images/tongguo@2x.png" alt="" placement="top"  ngbTooltip="通过" triggers="manual" #t="ngbTooltip" (click)="trigger(t)">
              <img *ngSwitchCase="1" src="assets/images/icondaishenpi@2x.png" ngbTooltip="进行中" #t="ngbTooltip" triggers="manual" (click)="trigger(t)"
                   alt="">
              <img *ngSwitchCase="3" src="assets/images/butongguo@2x.png" (click)="detail(step)" alt="">
            </div>
          </li>
          <!--  <li>
              <div class="user">李某某（班主任）</div>
              <img src="assets/images/butongguo@2x.png" alt="">
            </li>
            <li class="tag">
              <div class="user">宋毛毛（辅导员）</div>
              <img src="assets/images/icondaishenpi@2x.png" alt="">
            </li>
            <li>
              <div class="user">张某某（分管领导）</div>
              <img src="assets/images/tongguo@2x.png" alt="">
            </li>-->
        </ul>
      </ion-card-content>
    </ion-card>`
})
export class StepsComponent {
  open=false;
  @Input() Steps;
  trigger(t){
    console.log(t)
    t.toggle();
    //console.log(this.tooltip)
 /*   let flag=!open;
    flag?t.open():t.close()*/
  }

  constructor(public popoverCtrl: PopoverController, public toastCtrl: ToastController) {
    console.log(this.Steps)
  }

  detail(step) {
    console.log(step);
    switch (step.Status) {
      case 1:
        this.showToastWithCloseButton('进行中');
        break;
      case 2:
        this.showToastWithCloseButton('通过');
        break;
      case 3:
      case '3':
        this.showToastWithCloseButton(`未通过:${step.Reason}`);
        break;
    }
  }

  showToastWithCloseButton(msg = '') {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'middle',
      cssClass: 'toast',
      duration: 2000,
      /*      showCloseButton: true,
            closeButtonText: 'Ok'*/
    });
    toast.present();
  }
}

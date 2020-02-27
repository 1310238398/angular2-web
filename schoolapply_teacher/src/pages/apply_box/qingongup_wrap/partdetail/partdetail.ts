import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { HttpService } from "../../../../http/http.Service";
import { HelpUtils } from "../../../../app/utils/HelpUtils";
import { ServelUrl } from "../../../../app/ServelUrl";



declare var antlinker;

@IonicPage()
@Component({
  selector: 'partdetail',
  templateUrl: 'partdetail.html'
})
export class PartDetailPage {

  partwork = []
  page = {
    Page: 1,
    PageSize: 20,
  };
  moreData: boolean = true;

  PartWorkCode;

  inputShe = {
    PartWorkName: '',
    AcademyName: '',
    DepartmentName: '',
    worktime: '',
    PostNum: '',
    Description: '',
    Skill: '',
    Wage: '',

  }

  destr;
  skillstr;
  dresult = '';
  sresult = '';

  constructor(public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils, public navCtrl: NavController) {
    this.PartWorkCode = this.navParams.get('PartWorkCode');

  }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
    antlinker.configTitle({
      type: "label",
      title: "我要申请",
      fail: function () { },
      success: function () { }
    });
  }
  //初始化加载
  ionViewDidEnter() {

    this.indexpartworkinfo();

  }


  indexpartworkinfo() {
    this.http.postJSON({
      Router: ServelUrl.Url.indexpartworkinfo,
      Method: 'POST',
      Body: {
        Code: this.PartWorkCode,                 // 岗位code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.inputShe = res.Data;
        if (this.inputShe.Description) {
          this.destr = this.inputShe.Description;
          this.desciptionbr();
        }
        if (this.inputShe.Skill) {
          this.skillstr = this.inputShe.Skill;
          this.skillbr();
        }

      } else {
        console.log(res);
      }
    });


  }


  desciptionbr() {
    for (let i = 0; i < this.destr.length; i++) {
      var c = this.destr.substr(i, 1);
      if (c == "\n")
        this.dresult = this.dresult + "</br>";
      else if (c != "\r")
        this.dresult = this.dresult + c;
    }
    this.dresult = `<p class="second-content">` + this.dresult + `</p>`
    console.log('m', this.dresult);
    var z = document.createElement('p');
    z.setAttribute('style', 'font-family: PingFangSC-Regular;font-size: 16px;color: #666666;letter-spacing: 0.41px;line-height: 16px;margin: 0px 12px;width: auto;');
    z.innerHTML = this.dresult;
    document.getElementById("des").appendChild(z);

  }

  skillbr() {
    for (let i = 0; i < this.skillstr.length; i++) {
      var m = this.skillstr.substr(i, 1);
      if (m == "\n")
        this.sresult = this.sresult + "</br>";
      else if (m != "\r")
        this.sresult = this.sresult + m;
    }
    this.sresult = `<p class="second-content">` + this.sresult + `</p>`
    console.log('m', this.sresult);
    var sv = document.createElement('p');
    sv.setAttribute('style', 'font-family: PingFangSC-Regular;font-size: 16px;color: #666666;letter-spacing: 0.41px;line-height: 16px;margin: 0px 12px;width: auto;');
    sv.innerHTML = this.sresult;
    document.getElementById("skill").appendChild(sv);

  }




}

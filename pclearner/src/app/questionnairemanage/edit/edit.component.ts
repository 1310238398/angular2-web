import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpService} from "../../../http/http.service";
import {ServelUrl} from "../../ServelUrl";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  item = {
    record_id: '',
    code: '',
    name: '',
    version: 0,
    memo: '',
    status:1,
    agreement: ''
  };
  config: any = {
    height: 250,
    language: 'zh_CN',
    theme: 'modern',
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists code textcolor wordcount contextmenu colorpicker textpattern',
    toolbar: 'formatselect fontselect fontsizeselect | bold italic strikethrough forecolor backcolor | link code | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
    image_advtab: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    templates: [
      {title: '模板1', content: '校园集结号'},
      {title: '模板2', content: '校园集结号'}
    ]
  };
  data;

  constructor(private subject: NzModalSubject,
              public msgSrv: NzMessageService, private httpService: HttpService) {
  }

  ngOnInit() {
    if (this.data) {
      this.item = this.data;
    }
  }

  save() {
    if (!this.item.record_id) {
      delete this.item.record_id;
    }
    this.httpService.postJSON({
      Router: ServelUrl.Url.wenjuanSave,
      Method: 'POST',
      Body: this.item
    }).then(res => {
      this.msgSrv.success(res.FeedbackText);
      this.subject.next();
      this.close();
    })
  }

  close() {
    this.subject.destroy();
  }
}

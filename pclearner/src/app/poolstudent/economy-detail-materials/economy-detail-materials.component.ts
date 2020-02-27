import {Component, OnInit} from '@angular/core';
import {ServelUrl} from "../../ServelUrl";
import {HttpService} from "../../../http/http.service";
import {ActivatedRoute} from "@angular/router";
import {ModalHelper} from "../../shared/helper/modal.helper";
import {PreviewComponent} from "./preview/preview.component";

@Component({
  selector: 'app-economy-detail-materials',
  templateUrl: './economy-detail-materials.component.html',
  styleUrls: ['./economy-detail-materials.component.less']
})
export class EconomyDetailMaterialsComponent implements OnInit {

  attachs = [
    {
      "category": "ecostatus",
      "attachs": [{
        "name": "",
        "path": "http://d.hiphotos.baidu.com/image/pic/item/55e736d12f2eb938e81944c7d0628535e5dd6f8a.jpg",
        "key": "",
        "ext": "",
        "size": 0
      }]
    },
    {
      "category": "book",
      "attachs": [{
        "name": "",
        "path": "http://a.hiphotos.baidu.com/image/pic/item/71cf3bc79f3df8dc1138ba9bcf11728b471028b6.jpg",
        "key": "",
        "ext": "",
        "size": 0
      }]
    },
    {
      "category": "attach",
      "attachs": [{
        "name": "",
        "path": "http://f.hiphotos.baidu.com/image/w%3D310/sign=d2ec10e831fae6cd0cb4ad603fb10f9e/b151f8198618367a9f738e022a738bd4b21ce573.jpg",
        "key": "",
        "ext": "",
        "size": 0
      },
        {
          "name": "",
          "path": "http://a.hiphotos.baidu.com/image/pic/item/71cf3bc79f3df8dc1138ba9bcf11728b471028b6.jpg",
          "key": "",
          "ext": "",
          "size": 0
        }
      ]
    }
  ];

  constructor(private  modalHelper: ModalHelper, private route: ActivatedRoute, public httpService: HttpService) {
  }

  ngOnInit() {
    this.queryAttach(this.route.snapshot.params['code'])
  }

  queryAttach(intercode = '') {
    this.httpService.POST({
      Router: ServelUrl.Url.poolAttach, Method: 'POST', Body: {intelUserCode: intercode}
    }).subscribe(res => {
      if (!res.FeedBackCode) {
        console.log(res.Data);
        // this.attach = res.Data;
      }
    })
  }

  preview(attach = [],index=0) {
    this.modalHelper.open(PreviewComponent, {attach,index}).subscribe(() => {

    })
  }
}

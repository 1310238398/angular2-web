import { Component } from '@angular/core';
import { IonicPage, NavParams } from "ionic-angular";

declare var antlinker;
declare var $;
declare var PDFJS;

@IonicPage()
@Component({
  selector: 'page-pdfdisplay',
  templateUrl: 'pdfdisplay.html'
})
export class PdfDisplayPage {

  constructor(public navParams: NavParams) { }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "校园申请",
      fail: function () { },
      success: function () { }
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });

  }

  //初始化加载
  ionViewDidEnter() {
    this.showPdf()
  }



  showPdf() {
    var url = 'assets/demo.pdf';
    PDFJS.workerSrc = 'assets/js/pdf.worker.js';
    PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
      pdf.getPage(1).then(function getPageHelloWorld(page) {
        var scale = 1;
        var viewport = page.getViewport(scale);
        var canvasDom = $('#myCanvas');
        var context = canvasDom[0].getContext('2d');
        canvasDom[0].height = viewport.height;
        canvasDom[0].width = viewport.width;
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    });
  }










}

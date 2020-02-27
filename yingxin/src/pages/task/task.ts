import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';
import {HttpService} from "../../http/http.Service";
import {ServelUrl} from "../../app/ServelUrl";

@Component({
    selector: 'page-task',
    templateUrl: 'task.html'
})
export class TaskPage {
    @ViewChild("slides") slides: Slides;
    adItems: Array<any> = [];
    Tip: string = '';
    going = false;
    flag: boolean = true;
    news = [];
    taskList = [];
    time = {
        leftDays: 0,
        leftHours: 0,
        leftMinutes: 0,
        leftSeconds: 0
    }

    constructor(public navCtrl: NavController, private httpService: HttpService) {
        /*广告*/
        this.httpService.postJSON({
            Router: ServelUrl.Url.ad,
            Method: 'POST',
            Body: {SpaceCode: "yx_home_carousel"}
        }).then(res => {
            this.adItems = res.Data.List || [];
        });
        /*头条*/
        /*   this.httpService.postJSON({
               Router: ServelUrl.Url.topline,
               Method: 'POST',
               Body: {}
           }).then(res => {
               this.news = res.Data || [];
           });*/
        /*剩余天数*/
        this.httpService.postJSON({
            Router: ServelUrl.Url.tip,
            Method: 'POST',
            Body: {}
        }).then(res => {
            this.time = res.Data || '';
            if (this.time.leftDays == 0 && this.time.leftHours == 0 && this.time.leftMinutes == 0 && this.time.leftSeconds == 0) {
                this.going = true;
            } else {
                setInterval(() => {
                    this.time.leftSeconds = this.time.leftSeconds - 1;
                    if (this.time.leftSeconds == 0) {
                        this.time.leftMinutes = this.time.leftMinutes - 1;
                        this.time.leftSeconds = 60;
                    }
                    if (this.time.leftMinutes == 0) {
                        this.time.leftHours = this.time.leftHours - 1;
                        this.time.leftMinutes = 59;
                        this.time.leftSeconds = 60;
                    }
                    if (this.time.leftHours == 0) {
                        this.time.leftDays = this.time.leftDays - 1
                        this.time.leftHours = 23;
                        this.time.leftMinutes = 59;
                        this.time.leftSeconds = 60;
                    }
                }, 1000);
            }
        });
        this.loadData();
        console.log(this.adItems);
        document.addEventListener('visibilitychange', (event) => {
            console.log(event);
            if (event['visibilityState']) {
                this.loadData();
            }
            var isHidden = document.hidden;
            if (isHidden) {
            } else {
                this.loadData();
            }
        });
    }


    ionViewWillEnter() {
        console.log(this.slides);
        if (this.adItems.length == 1) {
            this.slides.stopAutoplay();
            this.flag = false;
        }
        antlinker.configTitle({
            type: "label",
            title: '迎新',
            fail: function () {

            },
            success: function () {
            }
        });
    }

    loadData() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.task,
            Method: 'POST',
            Body: {}
        }).then(res => {
            this.taskList = res.Data || [];
        });
    }

    dataUrl(url) {
        return "/" + url + '?imageView2/2/h/250/q/75'
    }


    ngAfterViewInit() {
        var doscroll = function () {
            var $parent = $('.js-slide-list');
            var $first = $parent.find('li:first');
            var height = $first.height();
            $first.animate({
                marginTop: -height + 'px'
            }, 500, function () {
                $first.css('marginTop', 0).appendTo($parent);
            });
        };
        setInterval(function () {
            doscroll()
        }, 2500);
    }

    onAd(item, e) {
        console.log(item);
        console.log(e);
        if (item.Uri) {
            antlinker.openNewView({
                uri: item.Uri,
                fail: function () {

                }
            });
        }
        this.httpService.postJSON({
            Router: ServelUrl.Url.adclickcount,
            Method: 'POST',
            Body: {SpaceCode: "yx_home_carousel", AdId: item.Id}
        }).then(res => {
        });
    }

    onTop(tip) {
        this.httpService.postJSON({
            Router: ServelUrl.Url.one,
            Method: 'GET',
            Body: {TopID: tip.TopID}
        }).then(res => {
            //this.navCtrl.push(page);
            /*  antlinker.openNewView({
             uri: uri,
             fail: function () {

             }
             });*/
            localStorage.setItem('item', JSON.stringify(res.Data));
            var uri = 'ant://h5app/open?URL=' + encodeURIComponent('yingxin/new/index.html');
            antlinker.openNewView({
                uri: uri,
                fail: function () {

                }
            });
            //this.navCtrl.push(NewPage, {top: res.Data})
        });
    }

    onTask(task) {
        console.log(task);
        if (task.Status == 1 || (task.Status == 2 && task.AllowView)) {
            /*任务点击*/

            this.httpService.postJSON({
                Router: ServelUrl.Url.click,
                Method: 'POST',
                Body: {TaskID: task.TaskID,Device:navigator.userAgent||""}
            }).then(res => {
            })
            /*是否动态跳转*/
            if (!task.URIMode) {
                console.log(!task.URIMode)
                console.log(task.URILoc)
                antlinker.openNewView({
                    uri: task.URILoc,
                    fail: function () {

                    }
                });
            } else {
                this.httpService.postJSON({
                    Router: ServelUrl.Url.uriloc,
                    Method: 'GET',
                    Body: {TaskID: task.TaskID}
                }).then(res => {
                    antlinker.openNewView({
                        uri: res.Data.URILoc,
                        fail: function () {

                        }
                    });
                });
            }
        }
    }
}

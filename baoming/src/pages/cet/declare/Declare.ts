import { Component } from "@angular/core";
/**
 * Created by hanzhendong on 2017/3/1.
 */
@Component({
    selector: 'page-Declare',
    templateUrl: './Declare.html'
})
export class Declare {
    constructor() {

    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '注意事项',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () {

            },
            success: function () {
            },
            trigger: function () {
            }

        });
    }
}
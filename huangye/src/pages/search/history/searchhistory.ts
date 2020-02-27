/**
 * Created by hanzhendong on 2017/5/4.
 */
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {HttpService} from "../../../http/http.Service";
import {ServelUrl} from "../../../app/ServelUrl";

@Component({
    selector: "page-searchhistory",
    templateUrl: './searchhistory.html'
})
export class SearchHistory {
    searchQuery = '';
    history: boolean = true;
    items = {};
    emptyV = false;
    kong: boolean = true;
    HisItems = [];
    loading: any;

    // kong = (this.items.kuaidi||[]).length<=0 && (this.items.chuxing||[]).length<=0 && (this.items.yinhang||[]).length<=0 && (this.items.ggfuwu||[]).length<=0 && (this.items.bumen||[]).length<=0 && (this.items.teacher||[]).length<=0 && (this.items.student||[]).length<=0;


    constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService) {
        antlinker.configTitle({
            type: "label",
            title: '黄页',
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
        this.initializeItems();


    }

    initializeItems() {
        this.http.postJSON({
            Router: ServelUrl.Url.getHisList,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                this.HisItems = comments.Data || [];
            });
    }

    /**
     * 文本改变
     * @param value
     */
    changeValue(value) {
        if (!value) {
            //获取历史记录
            this.history = true;
            this.emptyV=false;
            this.initializeItems();
        }
        // else{
        //   //查询数据
        //   this.getInfo();
        //   this.history = false;
        // }
    }

    /*
     * 查询数据
     * */
    search() {
        if (this.searchQuery) {
            this.saveSearchValue();
            this.getInfo();
            this.history = false;
        } else {
            this.history = true;
            //this.HelpUtils.toastPop("请输入关键字");
        }
    }

    /**
     * 获取查询数据
     */
    getInfo() {
        this.loading = this.HelpUtils.loadingPop();
        this.http.postJSON({
            Router: ServelUrl.Url.getList,
            Method: 'POST',
            Body: {
                Type: '',
                SearchValue: this.searchQuery || '',

            }
        }).then(
            comments => {
                console.log('comments',comments.Data);
                this.items = comments.Data || {};
                if(this.items['teacher']){
                    delete this.items['teacher'];
                }
                if( Object.keys(this.items).length == 0){
                    this.emptyV=true
                }else {
                    this.emptyV=false
                }
                console.log('this.items',this.items);
                this.loading.dismiss();
            },
            err => console.log(err));
    }

    /*
     * 打电话
     * */
    callPhone(params) {
        this.HelpUtils.callUp(params)
    }

    /**
     * 保存查询内容
     * @param params
     */
    saveSearchValue() {
        this.http.postJSON({
            Router: ServelUrl.Url.saveSearchValue,
            Method: 'POST',
            Body: {SearchValue: this.searchQuery}
        })
    }

    setValue(item) {
        this.searchQuery = item.SearchValue;
        this.getInfo();
        this.history = false;
    }

    /*
     * 删除历史
     * */
    deleteHis(item) {
        if (item.RecordId) {
            this.http.postJSON({
                Router: ServelUrl.Url.deleteHis,
                Method: 'POST',
                Body: {
                    RecordId: item.RecordId
                }
            }).then(
                data => {
                    this.initializeItems();
                },
                err => console.log(err));
        }
    }

    NavDetail(params, e) {
        if (params.type == 'bumen') {
            params.item = JSON.stringify(params.item)
        }
        if (!e.target.hasAttributes()) {
            console.log(1);
            this.navCtrl.push('DetailPage', params);
        }
    }
}

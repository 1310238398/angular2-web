import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import { fetchFlowGet } from '../../utils/request';
import util from '../../utils/util';
import { DoneItem } from '../../models/done-item';

@Component({
    tag: 'app-done-list',
    styleUrl: 'app-done-list.css'
})
export class AppdoneList {
    @Prop()
    history!: RouterHistory;

    @Prop()
    flowCode: string = '';

    @State()
    doneData: DoneItem[] = [];

    async componentDidLoad() {
        const loadingElement = await util.loading();
        fetchFlowGet<DoneItem[]>('/api/v1/flows/done', { flow_code: this.flowCode, count: '10' }).then(result => {
            result=result||[];
            this.doneData = [...result];
            loadingElement.dismiss();
        }).catch(() => {
            loadingElement.dismiss();
            util.alert('服务器发生错误');
        });
    }

    handleScroll = (ev: any) => {
        let lastTime = 0;
        if (this.doneData.length > 0) {
            lastTime = this.doneData[this.doneData.length - 1].process_time!;
        }
        fetchFlowGet<DoneItem[]>('/api/v1/flows/done', { flow_code: this.flowCode, count: '10', last_time: lastTime.toString() }).then(result => {
            this.doneData = [...this.doneData, ...result];
            ev.target.complete();
        }).catch(() => {
            ev.target.complete();
            util.alert('服务器发生错误');
        });
    }

    handleHistoryClick = (v: DoneItem) => {
        const path = `/flows/history?flow_instance_id=${v.flow_instance_id}`;
        this.history.push(path);
    }

    handleItemClick = (v: DoneItem) => {
        const path = `${v.form_data}?view=done&record_id=${v.record_id}`;
        this.history.push(path);
    }

    renderStatus(status: number) {
        let color = '#1AA3FC';
        let title = '进行中';
        if (status === 9) {
            color = '#14975B';
            title = '已完成';
        }
        return (<span style={{ 'color': `${color}` }}>{title}</span>);
    }

    render() {
        return (
            <ion-app>
                <ion-content>
                    <ion-list lines="none">
                        {this.doneData.map(v => {
                            return (
                                <div class="done-item">
                                    <div class="done-item-content" onClick={() => this.handleItemClick(v)}>
                                        <div class="done-item-content-title">{v.title}</div>
                                        <div class="done-item-content-footer">
                                            <span class="app-gray">申请时间：</span>
                                            {v.launch_time}
                                            <span class="app-gray" style={{ 'margin-left': '15px' }}>申请人：</span>
                                            {v.launcher_name}
                                        </div>
                                    </div>
                                    <div class="done-item-footer">
                                        <div class="done-item-footer-left">
                                            <span class="app-gray">状态：</span>
                                            {this.renderStatus(v.flow_status!)}
                                        </div>
                                        <div class="done-item-footer-right" onClick={() => this.handleHistoryClick(v)}>
                                            <span style={{ 'color': '#0B24FB', 'cursor': 'pointer' }}>查看申请进程</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ion-list>
                    <ion-infinite-scroll onIonInfinite={(e) => this.handleScroll(e)}>
                        <ion-infinite-scroll-content loadingText="加载中..."></ion-infinite-scroll-content>
                    </ion-infinite-scroll>
                </ion-content>
            </ion-app>
        );
    }
}
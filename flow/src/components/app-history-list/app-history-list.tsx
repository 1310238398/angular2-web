import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import util from '../../utils/util';
import { fetchFlowGet } from '../../utils/request';
import { HistoryItem } from '../../models/history-item';

@Component({
    tag: 'app-history-list',
    styleUrl: 'app-history-list.css'
})
export class AppHistoryList {
    @Prop()
    history!: RouterHistory;

    @State()
    historyData?: HistoryItem[];

    componentDidLoad() {
        const query = this.history.location.query;
        if (query) {
            this.fetchHistory(query['flow_instance_id']);
        }
    }

    async fetchHistory(flowInstanceID: string) {
        const loadingElement = await util.loading();
        fetchFlowGet<HistoryItem[]>('/api/v1/flows/history', { flow_instance_id: flowInstanceID }).then(result => {
            for (let i = 0; i < result.length; i += 1) {
                if (result[i].status === 2) {
                    result[i].out_item = JSON.parse(result[i].out_data!);
                }
            }
            this.historyData = result;
            loadingElement.dismiss();
        }).catch(() => {
            loadingElement.dismiss();
            util.alert('服务器发生错误');
        });
    }

    renderTime(v: HistoryItem) {
        if (v.process_time === '') {
            return;
        }
        return (
            <div class="history-item-title-right">
                <span class="app-gray">{v.process_time}</span>
            </div>
        );
    }

    renderComment(v: HistoryItem) {
        if (v.status === 1 || !v.out_item!.audit_comment || v.out_item!.audit_comment === '') {
            return;
        }
        return (
            <div class="history-item-comment">
                {v.out_item!.audit_comment}
            </div>
        );
    }

    renderItem() {
        if (!this.historyData) {
            return;
        }
        return this.historyData.map(v => {
            return (
                <div class="history-item">
                    <div class="history-item-title">
                        <div class="history-item-title-left">
                            {v.title}
                        </div>
                        {this.renderTime(v)}
                    </div>
                    {this.renderComment(v)}
                </div>
            );
        });
    }

    render() {
        return (
            <ion-list lines="none">
                <ion-list-header>申请进程</ion-list-header>
                {this.renderItem()}
            </ion-list>
        );
    }

}

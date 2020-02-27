import { Component, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';

import { fetchFlowGet } from '../../utils/request';
import util from '../../utils/util';
import { FlowItem } from '../../models/flow-item';

@Component({
    tag: 'app-flow-list'
})
export class AppFlowList {
    @Prop()
    history!: RouterHistory;
    @Prop()
    match!: MatchResults;

    @State()
    private flowData: FlowItem[] = [];

    async componentDidLoad() {
        const loadingElement = await util.loading();
        fetchFlowGet<FlowItem[]>('/api/v1/flows', { type_code: localStorage.getItem('flow_type') }).then(result => {
            this.flowData = result || [];
            loadingElement.dismiss();
        }).catch(() => {
            loadingElement.dismiss();
            util.alert('服务器发生错误');
        });
    }

    handleItemClick = (v: FlowItem) => {
        this.history.replace(`${v.form_data}?view=create&flow_id=${v.record_id}`);
    }

    render() {
        return (
            <div>
                <ion-list lines="full">
                    <ion-list-header>选择流程</ion-list-header>
                    {this.flowData.map(v => {
                        return (
                            <ion-item detail onClick={() => this.handleItemClick(v)}>
                                <ion-label>{v.name}</ion-label>
                            </ion-item>
                        );
                    })}
                </ion-list>
            </div>
        );
    }
}



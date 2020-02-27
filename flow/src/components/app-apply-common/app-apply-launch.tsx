import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import util from '../../utils/util';
import { fetchFlowGet, fetchFlowPost } from '../../utils/request';
import { ApplyItem } from '../../models/apply-item';
import { DoneItem } from '../../models/done-item';

@Component({
    tag: 'app-apply-launch',
    styleUrl: 'app-apply-common.css'
})
export class AppApplyLaunch {
    @Prop()
    history!: RouterHistory;

    @State()
    flowID: string = '';
    @State()
    recordID: string = '';
    @State()
    view: string = '';
    @State()
    doneItem: DoneItem = new DoneItem();
    @State()
    formItem: ApplyItem = new ApplyItem();

    private createAction = 'create';
    private doneAction = 'done';

    componentDidLoad() {
        const query = this.history.location.query;
        if (query) {
            this.view = query['view'];
            switch (this.view) {
                case this.createAction:
                    this.flowID = query['flow_id'];
                    break;
                case this.doneAction:
                    this.recordID = query['record_id'];
                    this.fetchDone();
                    break;
            }
        }
    }

    async fetchDone() {
        const loadingElement = await util.loading();
        fetchFlowGet<DoneItem>(`/api/v1/flows/done/${this.recordID}`).then(result => {
            this.doneItem = result;
            this.formItem = JSON.parse(result.out_data!);
            loadingElement.dismiss();
        }).catch(() => {
            loadingElement.dismiss();
            util.alert('服务器发生错误');
        });
    }

    async handleSubmit(e: any) {
        if (this.view !== this.createAction) {
            return;
        }
        e.preventDefault()
        if (this.formItem.title === '') {
            util.alert('请输入申请标题');
            return;
        } else if (this.formItem.content === '') {
            util.alert('请输入申请内容');
            return;
        }

        util.confirm('确定提交吗？', '提醒', async () => {
            const loadingElement = await util.loading('正在提交...');

            delete this.formItem.action;
            delete this.formItem.audit_comment;
            const formData = JSON.stringify(this.formItem);
            fetchFlowPost<string>('/api/v1/flows/launch', { flow_id: this.flowID, form_data: formData }).then(result => {
                loadingElement.dismiss();
                if (result === 'ok') {
                    util.alert('提交成功', '', () => {
                        this.history.replace('/');
                    });
                }
            }).catch(() => {
                loadingElement.dismiss();
                util.alert('服务器发生错误');
            });
        });
    }

    handleInputChange(name: string, ev: any) {
        switch (name) {
            case 'title':
                this.formItem.title = ev.target.value;
                break;
            case 'content':
                this.formItem.content = ev.target.value;
                break;
            case 'apply_date':
                this.formItem.apply_date = ev.target.textContent;
        }
    }

    renderSubmit() {
        if (this.view !== this.createAction) {
            return;
        }
        return (<ion-button type="submit" expand="block" class="form-submit">提 交</ion-button>);
    }

    render() {
        return (
            <form class="form" onSubmit={(e) => this.handleSubmit(e)}>
                <ion-list>
                    <ion-title>通用申请</ion-title>
                    <ion-item lines="inset">
                        <ion-label position="stacked" class="form-item-required">申请标题</ion-label>
                        <ion-input
                            readonly={this.view === this.doneAction}
                            name="title"
                            type="text"
                            value={this.formItem.title}
                            placeholder="请输入标题"
                            onIonChange={(e) => { this.handleInputChange("title", e) }}
                        ></ion-input>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked" class="form-item-required">申请内容</ion-label>
                        <ion-textarea
                            readonly={this.view === this.doneAction}
                            value={this.formItem.content}
                            placeholder="请输入内容"
                            onIonChange={(e) => { this.handleInputChange("content", e) }}
                        ></ion-textarea>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked" class="form-item-required">申请日期</ion-label>
                        <ion-datetime
                            disabled={this.view === this.doneAction}
                            cancelText="取消"
                            doneText="完成"
                            displayFormat="YYYY-MM-DD"
                            min="2010"
                            max="2020"
                            value={this.formItem.apply_date}
                            style={{ 'margin-left': '10px' }}
                            onIonStyle={(e) => { this.handleInputChange("apply_date", e) }}
                        ></ion-datetime>
                    </ion-item>
                    {this.renderSubmit()}
                </ion-list>
            </form>
        );
    }
}

import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import util from '../../utils/util';
import { fetchFlowGet, fetchFlowPost } from '../../utils/request';
import { ScholarshipItem } from '../../models/scholarship-item';
import { DoneItem } from '../../models/done-item';

@Component({
    tag: 'app-scholarship-launch',
    styleUrl: 'app-scholarship-common.css'
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
    formItem: ScholarshipItem = new ScholarshipItem();

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
            util.alert('请输入个人信息');
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
            case 'sxqk':
                this.formItem.sxqk = ev.target.value;
                break;
            case 'xxqk':
                this.formItem.xxqk = ev.target.value;
                break;
            case 'shqk':
                this.formItem.shqk = ev.target.value;
                break;
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
                    <ion-title>奖学金申请</ion-title>
                    <ion-item lines="inset">
                        <ion-label position="stacked" class="form-item-required">个人信息</ion-label>
                        <ion-input
                            readonly={this.view === this.doneAction}
                            name="title"
                            type="text"
                            value={this.formItem.title}
                            placeholder="请输入个人信息"
                            onIonChange={(e) => { this.handleInputChange("title", e) }}
                        ></ion-input>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked">思想情况</ion-label>
                        <ion-textarea
                            readonly={this.view === this.doneAction}
                            value={this.formItem.sxqk}
                            placeholder="请输入思想情况"
                            onIonChange={(e) => { this.handleInputChange("sxqk", e) }}
                        ></ion-textarea>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked">学习情况</ion-label>
                        <ion-textarea
                            readonly={this.view === this.doneAction}
                            value={this.formItem.xxqk}
                            placeholder="请输入学习情况"
                            onIonChange={(e) => { this.handleInputChange("xxqk", e) }}
                        ></ion-textarea>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked">生活情况</ion-label>
                        <ion-textarea
                            readonly={this.view === this.doneAction}
                            value={this.formItem.shqk}
                            placeholder="请输入生活情况"
                            onIonChange={(e) => { this.handleInputChange("shqk", e) }}
                        ></ion-textarea>
                    </ion-item>
                    {this.renderSubmit()}
                </ion-list>
            </form>
        );
    }
}

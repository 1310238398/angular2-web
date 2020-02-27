import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import util from '../../utils/util';
import { fetchFlowGet, fetchFlowPost } from '../../utils/request';
import { ScholarshipItem } from '../../models/scholarship-item';
import { TodoItem } from '../../models/todo-item';
import { DoneItem } from '../../models/done-item';

@Component({
    tag: 'app-scholarship-back',
    styleUrl: 'app-scholarship-common.css'
})
export class AppApplyBack {
    @Prop()
    history!: RouterHistory;

    @State()
    recordID: string = '';
    @State()
    view: string = '';
    @State()
    todoItem: TodoItem = new TodoItem();
    @State()
    doneItem: DoneItem = new DoneItem();
    @State()
    formItem: ScholarshipItem = new ScholarshipItem();

    private todoAction = 'todo';
    private doneAction = 'done';

    async componentDidLoad() {
        const query = this.history.location.query;
        if (query) {
            this.recordID = query['record_id'];
            this.view = query['view'];

            switch (this.view) {
                case this.todoAction:
                    this.fetchTodo();
                    break;
                case this.doneAction:
                    this.fetchDone();
                    break;
            }
        }
    }

    async fetchTodo() {
        const loadingElement = await util.loading();
        fetchFlowGet<TodoItem>(`/api/v1/flows/todo/${this.recordID}`).then(result => {
            this.todoItem = result;
            this.formItem = JSON.parse(result.input_data!);
            loadingElement.dismiss();
        }).catch(() => {
            loadingElement.dismiss();
            util.alert('服务器发生错误');
        });
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

    async submit() {
        const loadingElement = await util.loading('正在提交...');
        delete this.formItem.audit_comment;
        delete this.formItem.action;
        const formData = JSON.stringify(this.formItem);
        fetchFlowPost<string>('/api/v1/flows/handle', { record_id: this.recordID, form_data: formData }).then(result => {
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
    }

    handleSubmit() {
        if (this.view !== this.todoAction) {
            return;
        }
        util.confirm("确认提交吗？", '提醒', () => {
            this.submit();
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

    renderAuditComment() {
        if (this.view !== this.todoAction) {
            return;
        }
        return (
            <ion-item lines="inset">
                <ion-label position="stacked">审批意见</ion-label>
                <ion-textarea
                    readonly
                    value={this.formItem.audit_comment}
                ></ion-textarea>
            </ion-item>
        );
    }

    renderSubmit() {
        if (this.view !== this.todoAction) {
            return;
        }
        return (
            <ion-button expand="block" class="form-submit" color="primary" onClick={() => this.handleSubmit()}>提 交</ion-button>
        );
    }

    render() {
        return (
            <form class="form">
                <ion-list>
                    <ion-title>奖学金申请</ion-title>
                    {this.renderAuditComment()}
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

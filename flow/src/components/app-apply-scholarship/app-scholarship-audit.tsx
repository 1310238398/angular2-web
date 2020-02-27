import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import util from '../../utils/util';
import { fetchFlowGet, fetchFlowPost } from '../../utils/request';
import { ScholarshipItem } from '../../models/scholarship-item';
import { TodoItem } from '../../models/todo-item';
import { DoneItem } from '../../models/done-item';

@Component({
    tag: 'app-scholarship-audit',
    styleUrl: 'app-scholarship-common.css'
})
export class AppApplyAudit {
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

    private passAction = 'pass';
    private backAction = 'back';
    private todoAction = 'todo';
    private doneAction = 'done';

    componentDidLoad() {
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
            this.formItem.audit_comment = '';
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

    handleSubmit(action: string) {
        if (this.view !== this.todoAction) {
            return;
        }
        let message = '确定提交通过吗？';
        if (action === 'back') {
            message = '确定提交不通过吗？';
        }
        util.confirm(message, '提醒', () => {
            this.formItem.action = action;
            this.submit();
        });
    }

    handleInputChange(name: string, ev: any) {
        switch (name) {
            case 'audit_comment':
                this.formItem.audit_comment = ev.target.value;
                break;
        }
    }

    renderAuditAction() {
        if (this.view !== this.doneAction) {
            return;
        }

        switch (this.formItem.action) {
            case this.passAction:
                return (
                    <ion-item>
                        <ion-label color="success" style={{ 'text-align': 'center' }}>审批通过</ion-label>
                    </ion-item>
                );
            case this.backAction:
                return (
                    <ion-item>
                        <ion-label color="danger" style={{ 'text-align': 'center' }}>审批不通过</ion-label>
                    </ion-item>
                );
        }
        return;
    }

    renderSubmit() {
        if (this.view !== this.todoAction) {
            return;
        }
        return (
            <div>
                <ion-button expand="block" class="form-submit" color="success" onClick={() => this.handleSubmit(this.passAction)}>通 过</ion-button>
                <ion-button expand="block" class="form-submit" color="warning" onClick={() => this.handleSubmit(this.backAction)}>不通过</ion-button>
            </div>
        );
    }

    render() {
        return (
            <form class="form">
                <ion-list lines="none">
                    <ion-title>奖学金申请</ion-title>
                    <ion-item lines="inset">
                        <ion-label position="stacked" class="form-item-required">个人信息</ion-label>
                        <ion-input
                            readonly
                            name="title"
                            type="text"
                            value={this.formItem.title}
                        ></ion-input>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked">思想情况</ion-label>
                        <ion-textarea
                            readonly
                            value={this.formItem.sxqk}
                        ></ion-textarea>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked">学习情况</ion-label>
                        <ion-textarea
                            readonly
                            value={this.formItem.xxqk}
                        ></ion-textarea>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked">生活情况</ion-label>
                        <ion-textarea
                            readonly
                            value={this.formItem.shqk}
                        ></ion-textarea>
                    </ion-item>
                    <ion-item lines="inset">
                        <ion-label position="stacked">审批意见</ion-label>
                        <ion-textarea
                            readonly={this.view !== this.todoAction}
                            value={this.formItem.audit_comment}
                            onIonChange={(e) => { this.handleInputChange("audit_comment", e) }}
                        ></ion-textarea>
                    </ion-item>
                    {this.renderAuditAction()}
                    {this.renderSubmit()}
                </ion-list>
            </form>
        );
    }
}

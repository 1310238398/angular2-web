import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

import { fetchFlowGet } from '../../utils/request';
import util from '../../utils/util';
import { TodoItem } from '../../models/todo-item';

@Component({
    tag: 'app-todo-list',
    styleUrl: 'app-todo-list.css'
})
export class AppTodoList {
    @Prop()
    history!: RouterHistory;
    @Prop()
    flowCode: string = '';
    @Prop()
    callback?: Function;

    @State()
    todoData: TodoItem[] = [];

    async componentDidLoad() {
        const loadingElement = await util.loading();
        fetchFlowGet<TodoItem[]>('/api/v1/flows/todo', { flow_code: this.flowCode }).then(result => {
            this.todoData = result || [];
            if (this.callback) {
                this.callback(this.todoData.length);
            }
            loadingElement.dismiss();
        }).catch(() => {
            loadingElement.dismiss();
            util.alert('服务器发生错误');
        });
    }

    handleHistoryClick = (v: TodoItem) => {
        const path = `/flows/history?flow_instance_id=${v.flow_instance_id}`;
        this.history.push(path);
    }

    handleItemClick = (v: TodoItem) => {
        const path = `${v.form_data}?view=todo&record_id=${v.record_id}`;
        this.history.push(path);
    }

    render() {
        return (
            <ion-list lines="none">
                {this.todoData.map(v => {
                    return (
                        <div class="todo-item">
                            <div class="todo-item-content" onClick={() => this.handleItemClick(v)}>
                                <div class="todo-item-content-title">{v.title}</div>
                                <div class="todo-item-content-footer">
                                    <span class="app-gray">申请时间：</span>
                                    {v.launch_time}
                                    <span class="app-gray" style={{ 'margin-left': '15px' }}>申请人：</span>
                                    {v.launcher_name}
                                </div>
                            </div>
                            <div class="todo-item-footer">
                                <div class="todo-item-footer-left">
                                    <span class="app-gray">状态：</span>
                                    <span style={{ 'color': '#469DFC' }}>{v.node_name}</span>
                                </div>
                                <div class="todo-item-footer-right" onClick={() => this.handleHistoryClick(v)}>
                                    <span style={{ 'color': '#0B24FB', 'cursor': 'pointer' }}>查看申请进程</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ion-list>
        );
    }
}
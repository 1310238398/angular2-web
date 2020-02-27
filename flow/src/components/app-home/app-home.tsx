import { Component, State, Prop } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';

@Component({
    tag: 'app-home',
    styleUrl: 'app-home.css'
})
export class AppHome {
    @Prop()
    history!: RouterHistory;
    @Prop()
    match!: MatchResults;

    @State()
    flowCode: string = '';
    @State()
    selectTab: string = 'todo';
    @State()
    todoCount: number = 0;

    componentDidLoad() {
        let flowType = localStorage.getItem('flow_type') || 'XGSQ';
        const query = this.history.location.query;
        if (query) {
            this.flowCode = query['flow_code'];
            if (query.flow_type) {
                flowType = query.flow_type;
            }
        }
        localStorage.setItem('flow_type', flowType);

        this.calcHeight();
        const action = this.match.params.action;
        if (action) {
            this.selectTab = action;
        }
    }

    calcHeight() {
        let tabEle = document.getElementsByClassName('segment')[0];
        let listEle = document.getElementsByClassName("home-list")[0];
        let listHeight = document.documentElement.clientHeight - tabEle.clientHeight - 40;
        listEle.setAttribute('style', `height:${listHeight}px`);
    }

    onTabChange(ev: any) {
        this.selectTab = ev.target.value;
        this.history.replace(`/home/${ev.target.value}`);
    }

    renderList() {
        switch (this.selectTab) {
            case 'done':
                return (<app-done-list flowCode={this.flowCode} history={this.history}></app-done-list>);
            case 'todo':
                return (<app-todo-list
                    flowCode={this.flowCode}
                    history={this.history}
                    callback={(v: number) => { this.todoCount = v; }}
                >
                </app-todo-list>);
        }
        return;
    }

    renderBadge() {
        if (this.todoCount === 0) {
            return;
        }
        return (<ion-badge class="home-badge" color="danger">{this.todoCount}</ion-badge>);
    }

    render() {
        return (
            <div class="container">
                <ion-segment class="home-tab" color="primary" value={this.selectTab} onIonChange={(e) => this.onTabChange(e)}>
                    <ion-segment-button value="todo">
                        待办事项{this.renderBadge()}
                    </ion-segment-button>
                    <ion-segment-button value="done">
                        已办事项
                    </ion-segment-button>
                </ion-segment>
                <ion-app class="home-list">
                    {this.renderList()}
                </ion-app>
                <stencil-route-link url="/flows">
                    <ion-fab-button class="home-add-button">我要<br />申请</ion-fab-button>
                </stencil-route-link>
            </div>
        );
    }
}

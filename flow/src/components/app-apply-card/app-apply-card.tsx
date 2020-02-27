import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
    tag: 'app-apply-card',
    styleUrl: 'app-apply-card.css'
})
export class AppApplyCard {
    @Prop()
    history!: RouterHistory;

    handleSubmit(e: any) {
        e.preventDefault()
        this.history.replace('/home/done', {});
    }

    render() {
        return (
            <form class="form" onSubmit={(e) => this.handleSubmit(e)}>
                <div class="field has-text-centered">
                    <div class="title is-4">通用类申请</div>
                </div>
                <div class="field">
                    <label class="label">申请标题</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="请输入标题" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">申请内容</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="请输入内容"></textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="control has-text-centered">
                        <button class="button is-link" style={{ 'width': '99%' }}>提 交</button>
                    </div>
                </div>
            </form>
        );
    }
}
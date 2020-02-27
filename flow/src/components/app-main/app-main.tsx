import { Component } from '@stencil/core';
import '@stencil/router';
import '@ionic/core';

@Component({
    tag: 'app-main',
    styleUrl: 'app-main.css'
})
export class AppMain {
    render() {
        return (
            <stencil-router historyType="hash">
                <stencil-route url='/' component='app-home' exact={true}></stencil-route>
                <stencil-route url='/home/:action' component='app-home' exact={true}></stencil-route>
                <stencil-route url='/flows' component='app-flow-list' exact={true}></stencil-route>
                <stencil-route url='/flows/history' component='app-history-list' exact={true}></stencil-route>
                <stencil-route url='/apply/common/launch' component='app-apply-launch' exact={true}></stencil-route>
                <stencil-route url='/apply/common/audit' component='app-apply-audit' exact={true}></stencil-route>
                <stencil-route url='/apply/common/back' component='app-apply-back' exact={true}></stencil-route>
                <stencil-route url='/apply/scholarship/launch' component='app-scholarship-launch' exact={true}></stencil-route>
                <stencil-route url='/apply/scholarship/audit' component='app-scholarship-audit' exact={true}></stencil-route>
                <stencil-route url='/apply/scholarship/back' component='app-scholarship-back' exact={true}></stencil-route>
                <stencil-route url='/apply/scholarship2/launch' component='app-scholarship-launch' exact={true}></stencil-route>
                <stencil-route url='/apply/scholarship2/audit' component='app-scholarship-audit' exact={true}></stencil-route>
                <stencil-route url='/apply/scholarship2/back' component='app-scholarship-back' exact={true}></stencil-route>
                <ion-loading-controller></ion-loading-controller>
                <ion-alert-controller></ion-alert-controller>
            </stencil-router>
        );
    }
}

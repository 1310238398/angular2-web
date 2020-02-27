export default class Util {
    // 加载进度
    static async loading(content?: string) {
        const loadingController = document.querySelector('ion-loading-controller');
        await loadingController!.componentOnReady();
        const loadingElement = await loadingController!.create({
            content: content ? content : '加载中...',
            spinner: 'crescent',
        });
        await loadingElement.present();
        return loadingElement;
    }

    // 弹窗
    static async alert(message: string, title?: string, okHandler?: any) {
        const alertController = document.querySelector('ion-alert-controller');
        await alertController!.componentOnReady();

        const alert = await alertController!.create({
            header: title,
            message: message,
            buttons: [{ text: '确定', handler: okHandler }],
        });
        await alert.present()
        return alert;
    }

    // 确认弹窗
    static async confirm(message: string, title: string, okHandler: any) {
        const alertController = document.querySelector('ion-alert-controller');
        await alertController!.componentOnReady();

        const alert = await alertController!.create({
            header: title,
            message: message,
            buttons: [{ text: '确定', handler: okHandler }, { text: '取消' }],
        });
        await alert.present()
        return alert;
    }

    // 获取当前日期
    static getDate(): string {
        const date = new Date();
        let month = date.getMonth() + 1;
        let smonth = month.toString();
        if (month < 10) {
            smonth = '0' + month;
        }

        let day = date.getDate();
        let sday = day.toString();
        if (day < 10) {
            sday = '0' + day;
        }
        const s = `${date.getFullYear()}-${smonth}-${sday}`;
        return s;
    }
}
import Vue from 'vue';
export default {
    getList() {
        Vue.http.get('ggg')
    },
    responseToJson(resp) {
        return (resp.text() && resp.json()) || undefined;
    },
    catchAuthError(res) {
        console.log(res);
        if (res.status === 401 || res.status === 403) {
            let errMsg;
            if (res instanceof Response) {
                let err;
                try {
                    let body = res.json();
                    err = body.message;
                } catch (e) {
                    err = '';
                }
                errMsg = `${res.status}:${res.statusText || ''} ${err}`;
            }
            console.log(errMsg);
        }
        return Promise.reject(res);
    },
    postJson(params, url = '/api/third/interface'){
        return Vue.http.post(url, JSON.stringify({
                Router: params.Router,
                Method: params.Method || 'GET',
                body: JSON.stringify(params.body)
            } || null))
            .then(r => this.responseToJson(r))
            .catch(this.catchAuthError)
    },
    toast(text){
        var newDiv = document.createElement("div");
        var newContent = document.createTextNode(text);
        newDiv.appendChild(newContent);
        newDiv.className = "toast show";
        document.body.appendChild(newDiv);
        setTimeout(function () {
            newDiv.className = newDiv.className.replace("show", "");
        }, 3000);
    }
}
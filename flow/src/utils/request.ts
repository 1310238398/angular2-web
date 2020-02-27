declare var window: any;

// 请求API接口
export function fetchFlowAPI<T>(router: string, method: string, body: any): Promise<T> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    // 1. S_IYF4ZIO9WTPK_F-LHOPG
    // 2. B6LJIG5HMFSNQECXOGOJHG
    // 3. DQ9Z_VDEPF-GOTU00KXCCQ
    header.append("AccessToken", window["__AppWebkey"]||'DQ9Z_VDEPF-GOTU00KXCCQ');

    let obj = {
        Router: router,
        Method: method,
        Body: JSON.stringify(body),
    };

    let request = new Request("/api/flow/interface", {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: header
    });

    return fetch(request).then(res => {
        if (res.status === 200) {
            return res;
        }
        throw new Error(res.statusText);
    }).then(res => {
        return res.json();
    });
}

// get请求
export function fetchFlowGet<T>(router: string, body?: any): Promise<T> {
    return fetchFlowAPI(router, 'GET', body);
}

// post请求
export function fetchFlowPost<T>(router: string, body?: any): Promise<T> {
    return fetchFlowAPI(router, 'POST', body);
}

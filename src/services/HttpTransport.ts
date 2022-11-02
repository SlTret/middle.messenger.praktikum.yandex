const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

function queryStringify(data:object) {
    return Object.entries(data).reduce((acc, [key, value], index, arr) =>
        acc + `${key}=${value}` + (index == arr.length - 1 ? "" : "&"), "?")
}

export class HttpTransport {

    request(url:string, options:{[key:string] : object | string} = {}, timeout = 5000) {
        let { method, data } = options;

        if (!method) {
            method = METHOD.GET
            data = {}
        }

        if (method === METHOD.GET)
            url += queryStringify(data as object);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            xhr.open(method as string, url, true);
            xhr.onload = function() {
                if (method == METHOD.GET) {
                    if (xhr.status != 200) {
                        reject(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`))
                    } else {
                        resolve(xhr);
                    }
                } else {
                    if (this.status == 404) {
                        reject(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`))
                    } else {
                        resolve(xhr);
                    }
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
type Method = "GET" | "POST" | "PUT" | "DELETE";

function queryStringify(data: object) {
    return "?" + Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&")
}

type Options = {
    method : Method | null,
    data: object | null
}

export class HttpTransport {

    request(url: string, options: Options, timeout = 5000) {
        let { method, data } = options;

        if (!method) {
            method = "GET"
            data = {}
        }

        if (method === "GET")
            url += queryStringify(data as object);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            xhr.open(method as string, url, true);
            xhr.onload = function () {
                if (method == "GET") {
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

            if (method === Method.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
import { BASE_URL } from "../api/base-api";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

function queryStringify(data: object) {
    return "?" + Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&")
}

export type Options = {
    method: Method | null,
    data: FormData | object | null
    headers: {[key:string] : string}
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTP {

    private _url: string;

    constructor(url: string) {
        this._url = BASE_URL + url;
    }

    public get(url: string, data: object = {}): Promise<any> {
        return this.request(this._url + url, { data, method: 'GET', headers: {} });
    }

    public post(url: string, data: object): Promise<any> {
        return this.request(this._url + url, { data, method: 'POST', headers: {} });
    }

    public put = (url: string, data: object, headers = {}) => {
        return this.request(this._url + url, { data, method: 'PUT', headers });
    }

    public delete = (url: string,  data: object, headers = {} ) => {
        return this.request(this._url + url, { data, method: 'DELETE', headers });
    }

    private request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
        let { method, data } = options;


        console.log("method", method, url)

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

            xhr.withCredentials = true;

            if(data?.constructor?.name !== 'FormData') {
                xhr.setRequestHeader('accept', 'application/json');
                xhr.setRequestHeader('content-type', 'application/json');
            }

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

            if (method === "GET" || !data) {
                xhr.send();
            } else {
                console.log("SEND", data.constructor.name, JSON.stringify(data))
                if(data.constructor.name == 'FormData') {
                    xhr.send(data as FormData);
                } else {
                    xhr.send(JSON.stringify(data));
                }

            }
        });
    }
}

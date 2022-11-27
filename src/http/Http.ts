import { BASE_URL } from "../api/base-api";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

function queryStringify(data: object) {
  return "?" + Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&")
}

export type Options = {
  method?: Method | null,
  data?: FormData | object | null
  headers?: { [key: string]: string }
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<unknown>

export class HTTP {

  private _url: string;

  constructor(url: string) {
    this._url = BASE_URL + url;
  }

  public get: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: 'GET' });
  }

  public post: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: 'POST' });
  }

  public put: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: 'PUT' });
  }

  public delete: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: 'DELETE' });
  }

  private request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
    url = this._url + url
    let { method, data } = options;

    console.log("method", method, url)

    if (!method) {
      method = "GET"
      data = {}
    }

    if (method === "GET" && data)
      url += queryStringify(data as object);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.open(method as string, url, true);

      xhr.withCredentials = true;

      if (data?.constructor?.name !== 'FormData') {
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
        if (data.constructor.name == 'FormData') {
          xhr.send(data as FormData);
        } else {
          xhr.send(JSON.stringify(data));
        }

      }
    });
  }
}




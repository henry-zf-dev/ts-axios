import {AxiosRequestConfig} from "./types";

export default function xhr(config: AxiosRequestConfig): void {

  // 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest

  const {data = null, url, method = 'get', headers} = config;

  const request = new XMLHttpRequest();

  request.open(method.toLocaleUpperCase(), url, true); // 默认异步

  // headers 需要在 request.open 之后设置
  Object.keys(headers).forEach(key => {
    if (data === null && key.toLowerCase() === 'content-type') {
      // 当没有 data 时，就不需要设置 content-type
      delete headers[key]
    } else {
      request.setRequestHeader(key, headers[key])
    }
  });

  request.send(data);
}

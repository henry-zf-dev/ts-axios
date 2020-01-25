
import {AxiosRequestConfig} from "./types";
import xhr from './xhr';
import {buildURL} from "./helpers/url";
import {transformRequest} from "./helpers/data";
import {processHeaders} from "./helpers/headers";

function axios(config: AxiosRequestConfig): void {
  processConfig(config);
  xhr(config);
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  // 注：需要先处理 headers，再处理 request data，
  // 因为在 transformRequestData 方法中可能已经将 data 转化为 JSON 字符串了
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

// 对请求 url 做处理
function transformURL(config: AxiosRequestConfig): string {
  const {url, params} = config;
  return buildURL(url, params);
}

// 对 headers 做处理
function transformHeaders(config: AxiosRequestConfig): any {
  const {headers = {}, data} = config; // 需要给 headers 一个默认值
  return processHeaders(headers, data);
}

// 对请求 body 做处理
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}


export default axios

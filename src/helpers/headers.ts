import {isPlainObject} from "./util";

function normalizeHeaderName(headers:any, normalizedName:string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(key => {
    if (key !== normalizedName && key.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[key];
      delete headers[key]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // 先规范大小写
  normalizeHeaderName(headers, 'Content-Type');
  // 如果 data 为普通对象，则需要添加 content-type application/json
  if (isPlainObject(data)) {
    // headers 大小写不敏感
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers;
}

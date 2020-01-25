import {isDate, isPlainObject} from "./util";

function encode(val: string): string {
  // 特殊字符编码，有字母则需要使用 'ig'，忽略大小写
  // str.replace(参数1, 参数2) 将字符串 str 中的参数1替换为参数2
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = [];

  Object.keys(params).forEach(key => {
    const val = params[key];
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = [];
    // 将 val 都转化为数组形式
    if (Array.isArray(val)) {
      values = val;
      key += '[]'; // 参数作为数组传递，如：/base/get?foo[]=bar&foo[]=baz'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  });

  let serializedParams = parts.join('&');

  if (serializedParams) {
    // 忽略 # 号后的内容
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 判断 url 上是否已经存在参数，来决定新增的参数之前是否需要添加 '?' 或者 '&'
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

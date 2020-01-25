import {isPlainObject} from "./util";

export function transformRequest(data: any): any {

  // send 方法的参数支持 Document 和 BodyInit 类型，
  // BodyInit 包括了 Blob, BufferSource, FormData, URLSearchParams, ReadableStream、USVString，
  // 当没有数据的时候，还可以传入 null
  // 参考：https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send

  // 一般我们调用接口传的参数都是以 JSON 对象形式传递的，而对象并没有被包含到以上 send 方法所支持的数据类型中，
  // 所以需要在这个方法中做处理，转化成 JSON 字符串（包含在 USVString 中）
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

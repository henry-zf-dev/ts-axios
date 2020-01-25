const toString = Object.prototype.toString; // 缓存起来

// 使用类型谓词指定类型
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 所以对象的判断
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 判断是否为普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

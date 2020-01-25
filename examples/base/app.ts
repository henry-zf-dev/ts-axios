import axios from '../../src/index'

// 参数包含数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
});

// 参数包含对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
});

// 参数包含 Date
const date = new Date();
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
});

// 参数包含特殊字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
});

// 参数包含 null
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
});

// 忽略 # 后的内容
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
});

// url 已经存在参数
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
});

// post json 对象
// 未指定 content-type
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
});

// 指定 content-type
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  data: {
    a: 1,
    b: 2
  }
});

// post 数组 buffer
const arr = new Int32Array([21, 31]);
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
});

const paramsString = 'q=URLUtils.searchParams&topic=api';
const searchParams = new URLSearchParams(paramsString);
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
});

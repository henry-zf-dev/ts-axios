const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(WebpackConfig); // 使用 webpack 进行编译，并将编译结果作为中间件的参数

// use 为 express 使用中间件的写法
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stat: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 服务端暴露接口路由
const router = express.Router();

router.get('/simple/get', function (req, res) {
  res.json({
    msg: `hello world`
  })
});

router.get('/base/get', function (req, res) {
  res.json(req.query)
});

router.post('/base/post', function (req, res) {
  res.json(req.body)
});

router.post('/base/buffer', function (req, res) {
  // 对于 buffer，需要用以下方式，将请求的数据源复制到一个数组，在所以数据接收完毕后，
  // 通过 Buffer.concat 方法处理，再转化我 JSON
  let msg = [];
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  });
  req.on('end', () => {
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  })
});

app.use(router);

// 启动后台进程
const port = process.env.PORT || 8081;
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
});

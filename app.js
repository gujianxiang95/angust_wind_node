var createError = require('http-errors'); //错误处理
var express = require('express');
var path = require('path'); 
var cookieParser = require('cookie-parser'); //解析cookie 可以通过req.cookie访问cookie
var logger = require('morgan'); //记录accesslog日志功能
var session = require('express-session') //本项目在路由之前使用
var RedisStore = require('connect-redis')(session)

var indexRouter = require('./routes/index'); //引用路由
var usersRouter = require('./routes/users'); 
const fs =require('fs')

var app = express(); //客户端访问提供的实例

// view engine setup //注册视图引擎设置 注释掉
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug');

const env = process.env.NODE_ENV
if(env!=='prd'){
  app.use(logger('dev')); //开发环境
}else{
  // 获取文件写入流
  app.use(logger('combined',{ //线上环境
    stream: process.stdout, //默认参数
  }));
}
// app.use(logger('dev'));
// app.use(logger('dev',{
  // stream: process.stdout, //默认参数
// }));
app.use(express.json()); //处理content-type为application/json格式的 请求数据 可以通过req.body等等
app.use(express.urlencoded({ extended: false })); //获取其他请求格式的数据
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //暂时不使用静态文件夹

const  redisClient  = require('./db/redis') //session同步 存储到redis
const sessionStore = new RedisStore({
  client:redisClient
})
app.use(session({ 
  resave: true ,
  saveUninitialized: false,
  secret: 'wind', //设置秘钥
  cookie: {   //cookie没目录
    path: '/', //默认配置 根目录 设置前端可以访问目录
    httpOnly: true, //默认配置 前端js无法访问
    maxAge: 24 * 60 * 60 * 1000 //过期时间
  },
  store: sessionStore
}))

app.use('/', indexRouter);   //注册路由
app.use('/wind/users', usersRouter); // /user为父路由

// catch 404 and forward to error handler
app.use(function(req, res, next) { // 未请求到路由
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { //程序错误
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置session
app.use(session({
  secret: 'star', //加密串
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*30 },
  rolling: true
}));


// 应用程序内局部变量 - 假设一个帐号
// app.locals.globalUser = [{
//   username: 'ceshi',
//   password: 'e10adc3949ba59abbe56e057f20f883e'    //123456
// }]

// 自定义中间件用于用户权限设置
app.use((req, res, next)=>{
  // 判断路由
  if(req.url == '/' || req.url == '/login' || req.url == '/doLogin'){
    next()
  }else{
    // 通过是否有session数据进行权限判断
    if(req.session.userInfo != undefined && req.session.userInfo != ''){
      // 配置全局变量，可以在任何模板中使用
      req.app.locals['userInfo'] = req.session.userInfo
      next()
    }else{
      res.redirect('/login')
    }
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

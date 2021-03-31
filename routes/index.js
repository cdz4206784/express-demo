var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
var db = require('../utils/db');  //操作mongodb方法

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登录页
router.get('/login', function(req, res, next){
  res.render('login', {title: 'User Login'})
})

// 登录操作
router.post('/doLogin', (req, res)=>{
  let username = req.body.username
  let password = md5(req.body.password)

  // 查找mongodb中的数据库
  db.findOne('users', {username}, function(err, results){
    if(err) throw err;
    console.log(results)
    if(typeof results == 'object'){
      if(results.password == password){
        req.session.userInfo = username
        res.redirect('/users/')
      }else{
        res.send("<script>alert('用户名或密码错误'); location.href='/login';</script>")
      }
    }
  })
})

// 退出登录
router.get('/loginOut', function(req, res, next){
  // 销毁session
  req.session.destroy((err)=>{
    if(err){
        console.log(err)
    }else{
        res.redirect('/login')
    }
})
})

module.exports = router;
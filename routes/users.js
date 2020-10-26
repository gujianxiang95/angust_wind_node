var express = require('express')
var router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { genPassword } = require('../utils/cryp')
const loginCheck = require('../middleWare/loginCheck')

router.post('/login', function(req,res,next){
    // res.render('index', {title: 'mylogin'}); //返回页面内容
    const { username, password } = req.body //获取前端传参\
    console.log('password',password)
    const result = login(username,  genPassword(password))
    return result.then(userInfo=>{
        if(userInfo.length > 0){
            req.session.username = userInfo[0].username
        }
        res.json(new SuccessModel(userInfo))
    },err=>{
        res.json(new ErrorModel(err))
    })
});

router.get('/login-test', loginCheck, function(req,res,next){
    console.log('req', req)
    if(req.session.username){
        res.json({
            code: 0,
            msg:'已登录'
        })
        return
    }
    res.json({
        code: -1,
        msg:'!未登录'
    })
});
// router.get('/session-test', function(req,res,next){
//     const { session } = req
//     if(session.viewNum == null){
//         session.viewNum = 0       
//     }
//     session.viewNum++
//     res.json({
//         viewNum: session.viewNum
//     })
// });
// router.post('/register', function(req,res,next){
//     const { username, password } = req.body //获取前端传参
//     res.json({
//         code: 0,
//         msg: '注册成功',
//         data: {
//             username,
//             password
            
//         }
//     })
// });
module.exports = router
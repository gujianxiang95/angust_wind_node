const xss = require('xss') //防止xss攻击
const { exec } = require('../db/mysql') 

const login = (username,password)=>{
    let sql = 'select * from user where 1 = 1'
    if(!username){
        return "请输入用户名"
    }
    if(!password){
        return "请输入密码"
    }
    sql += " and username = '"+ username +"' and userpwd = '"+ password +"'";
    return exec(sql)
}

module.exports = {
    login
}
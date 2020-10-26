const { MYSQL_CONF } = require('../conf/db')
const mysql = require('mysql')

//创建连接对象
const conn = mysql.createConnection(MYSQL_CONF)
//链接
conn.connect()

//执行sql 语句
function exec(sql){
    return new Promise((resolve,reject)=>{
        conn.query(sql, (err, res)=>{
            if(err){
                reject(err)
                return
            }
            resolve(res)

        })
    })
}
module.exports = {
    exec,
    escape: mysql.escape
}

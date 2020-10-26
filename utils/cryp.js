const crypto = require('crypto') //加密库

//秘钥
const SECERT_KEY = 'gujianxiang'

//md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}


// 加密函数
function genPassword(pwd) {
    const str = `password=${pwd}&key=${SECERT_KEY}`
    return md5(str)
}
module.exports = {
    genPassword
}

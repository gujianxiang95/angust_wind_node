const env = process.env.NODE_ENV

//配置
let MYSQL_CONF = {}
let REDIS_CONF = {}
if( env === 'dev'){
    MYSQL_CONF = {
        host: "114.215.172.240",
        user: "root",
        password: "199504",
        port: 3306,
        database: "august_wind"
    }
    REDIS_CONF = {
        host:'127.0.0.1',
        // host: '114.215.172.240',
        port: 6379
    }
}
if( env === 'prd'){
    MYSQL_CONF = {
        host: "114.215.172.240",
        user: "root",
        password: "199504",
        port: 3306,
        database: "august_wind"
    }
    REDIS_CONF = {
        host:'127.0.0.1',
        // host: '114.215.172.240',
        port: 6379
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}

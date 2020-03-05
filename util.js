var mysql = require('mysql');
var db = require('./db')
var pool = mysql.createPool({
    host: db.mysql.host,
    user: db.mysql.user,
    password: db.mysql.password,
    database: db.mysql.database,
    port: db.mysql.port,
});
var query = function (sql, addsql, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            connection.query(sql, addsql, function (qerr, vals) {
                //释放连接
                connection.release();
                //事件驱动回调
                callback(qerr, vals);
            });
        }
    });
};
module.exports = query;
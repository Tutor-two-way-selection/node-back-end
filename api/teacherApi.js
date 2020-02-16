var query = require('../util');
var sqlMap = require('../sqlMap');
var login = function (req, res, next) {
    var sql = sqlMap.teacher.select_teacheracount;
    //var addsql = req.body;
    var $result = {
        success: false,
    }
    var addsql = {
        teaNum: '1001',
        teaPass: '123456789',
    };
    query(sql, addsql.teaNum, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            res.send($result);
        } else {
            if (result[0]) {
                //登录成功
                var resultArray = result[0];
                console.log(resultArray);
                if (resultArray.pass == addsql.teaPass) {
                    $result.success = true;
                    res.send($result);
                } else {
                    $result.success = false;
                    res.send($result);
                }
            } else {
                $result.success = false;
                res.send($result);
            }
        }
    });
};
var info = function (req, res, next) {
    var addsql = {
        teaID: '1001'
    }
    var sql = sqlMap.student.select_oneteacher;
    query(sql, addsql.teaID, function (err, result) {

        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        } else {
            res.send(result[0])
        }
    })
}
var changeinfo = function (req, res, next) {
    var addsql = {
        teaID: '1001',
        name: 'hcf',
        department: 'iuvm',
        search: 'xnadl',
        contact: 'qjeb'
    }
    var data = {
        success: false
    }
    var sql = sqlMap.teacher.update_teacher_selfinfo;
    query(sql, [addsql.name, addsql.department, addsql.search, addsql.contact, addsql.teaID], function (err, result) {
        if (err) {
            console.log("[UPDATE ERROR]:", err.message);
            res.send(data);
        } else {
            data.success = true;
            res.send(data);
        }
    })
}

module.exports = {
    login,
    info,
    changeinfo
}
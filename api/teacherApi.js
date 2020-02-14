var query = require('../util');
var sqlMap = require('../sqlMap');
var login = function (req, res, next) {
    var sql = sqlMap.student.select_stunum;
    //var addsql = req.body;
    var $result = {
        success: 0,
        passChanged: 0,
    }
    var addsql = {
        stuID: '1001',
        stuPass: '123456789',
    };
    query(sql, addsql.stuID, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            res.send($result);
        } else {
            if (result[0]) {
                //登录成功
                var resultArray = result[0];
                console.log(resultArray);

                if (resultArray.stuPass == addsql.stuPass) {
                    $result.success = 1;
                    $result.passChanged = resultArray.passChanged;
                    res.send($result);
                } else {
                    $result.success = 0;
                    res.send($result);
                }
            } else {
                $result.success = 0;
                res.send($result);
            }
        }
    });
};


module.exports = {}
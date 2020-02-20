var query = require('../util');
var sqlMap = require('../sqlMap');
var systemset = require("../systemset.json")
var login = function (req, res, next) {
    var sql = sqlMap.admin.login;
    //var addsql = req.body;
    var data = {
        success: false,
    }
    var addsql = {
        admNum: '123456',
        admPass: '12345'
    }
    query(sql, addsql.admNum, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            data.err = "服务器错误";
            data.success = false;
            res.send(data);
        } else {
            if (result[0]) {
                //登录成功
                var resultArray = result[0];
                console.log(resultArray);
                if (resultArray.adminPass === addsql.admPass) {
                    data.success = true;
                    res.send(data);
                } else {
                    data.err = "密码错误";
                    data.success = false;
                    res.send(data);
                }
            } else {
                data.err = "用户名错误";
                data.success = false;
                res.send(data);
            }
        }
    });
};
var stulist = function (req, res, next) {
    var sql0 = sqlMap.admin.stulist;
    //var addsql = req.body;
    var data = {
        stuList: [],
        tableList: systemset.tableList
    }
    
    
    var addsql = {
        admNum: '123456',
        type: 'regular'
    }
    query(sql0,addsql.admNum,function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            data.err = "服务器错误";
            data.stuList = [];
            res.send(data);
        }
        else{
            data.stuList=result;
            if(addsql.type=="regular"){
                var sql1=sqlMap.student.select_file_tableBody_regular;
                var sql2=sqlMap.student.select_choice_regular_first;
                var sql3=sqlMap.student.select_choice_regular_second;
                data.stuList.forEach(function(d,j){
                    query(sql1,d.stuNum,function(err,result){
                        if (err) {
                            console.log("[SELECT ERROR]:", err.message);
                            data.err="服务器错误"
                            res.send(data);
                        } 
                        else {
                            var body = JSON.parse(result[0].tableBody)
                            for (var i = 0; i < data.tableList.length; i++) {
                                d[data.tableList[i].name] = body[data.tableList[i].name]
                            }
                            console.log(data);
                            query(sql2,d.stuNum,function(err,result){
                                if (err) {
                                    console.log("[SELECT ERROR]:", err.message);
                                    data.err="服务器错误"
                                    res.send(data);
                                } 
                                else{
                                    d.firstChoice=result[0];
                                    query(sql3,d.stuNum,function(err,result){
                                        if (err) {
                                            console.log("[SELECT ERROR]:", err.message);
                                            data.err="服务器错误"
                                            res.send(data);
                                        } 
                                        else{
                                            d.secondChoice=result[0];
                                            if(j==data.stuList.length-1){
                                                res.send(data)
                                            }
                                        }
                                    })
                                }
                            })

                        }
                    });
                })
            }
            else if(addsql.type="graduate"){
                var sql4=sqlMap.student.select_file_tableBody_graduate;
                var sql5=sqlMap.student.select_choice_graduate_first;
                var sql6=sqlMap.student.select_choice_graduate_second;
                data.stuList.forEach(function(d){
                    query(sql4,d.stuNum,function(err,result){
                        if (err) {
                            console.log("[SELECT ERROR]:", err.message);
                            data.err="服务器错误"
                            res.send(data);
                        } 
                        else {
                            var body = JSON.parse(result[0].tableBody)
                            for (var i = 0; i < data.tableList.length; i++) {
                                d[data.tableList[i].name] = body[data.tableList[i].name]
                            }
                            query(sql5,d.stuNum,function(err,result){
                                if (err) {
                                    console.log("[SELECT ERROR]:", err.message);
                                    data.err="服务器错误"
                                    res.send(data);
                                } 
                                else{
                                    d.firstChoice=result[0];
                                    query(sql6,d.stuNum,function(err,result){
                                        if (err) {
                                            console.log("[SELECT ERROR]:", err.message);
                                            data.err="服务器错误"
                                            res.send(data);
                                        } 
                                        else{
                                            d.secondChoice=result[0];
                                        }
                                    })
                                }
                            })

                        }
                    });
                })
            }
        }
    })
}
module.exports = {
    login,
    stulist
}





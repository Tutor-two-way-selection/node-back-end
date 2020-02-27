var query = require("../util");
var sqlMap = require("../sqlMap");
var async = require("async");
var systemset = require("../systemset.json");
var login = function (req, res) {
    var sql = sqlMap.teacher.select_teacheracount;
    //var addsql = req.body;
    var data = {
        success: false
    };
    var addsql = {
        teaNum: "1001",
        teaPass: "123456789"
    };
    query(sql, addsql.teaNum, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            data.err = "服务器错误";
            res.send(data);
        } else {
            if (result[0]) {
                //登录成功
                var resultArray = result[0];
                console.log(resultArray);
                if (resultArray.pass === addsql.teaPass) {
                    data.success = true;
                    res.send(data);
                } else {
                    data.success = false;
                    data.err = "密码不正确";
                    res.send(data);
                }
            } else {
                data.success = false;
                data.err = "用户名不正确";
                res.send(data);
            }
        }
    });
};
var info = function (req, res) {
    var addsql = {
        teaID: "1001"
    };
    var sql = sqlMap.student.select_oneteacher;
    query(sql, addsql.teaID, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        } else {
            res.send(result[0]);
        }
    });
};
var changeinfo = function (req, res) {
    var addsql = {
        teaID: "1001",
        name: "hcf",
        department: "iuvm",
        search: "xnadl",
        contact: "qjeb"
    };
    var data = {
        success: false
    };
    var sql = sqlMap.teacher.update_teacher_selfinfo;
    query(
        sql,
        [
            addsql.name,
            addsql.department,
            addsql.search,
            addsql.contact,
            addsql.teaID
        ],
        function (err, result) {
            if (err) {
                console.log("[UPDATE ERROR]:", err.message);
                data.err = "服务器错误";
                res.send(data);
            } else {
                data.success = true;
                res.send(data);
            }
        }
    );
};
var stuinfo = function (req, res) {
    //var addsql=req.body;
    var addsql = {
        teaID: "1001",
        type: "regular"
    };
    var data = {
        tableList: systemset.tableList,
        stuList: []
    };
    var sql1 = sqlMap.student.select_file_tableBody_regular;
    var sql2 = sqlMap.student.select_file_tableBody_graduate;
    if (addsql.type === "regular") {
        async.eachSeries(
            Object.keys(systemset.batch.regular),
            function (item, callback) {
                //if (systemset.batch.regular[item] == 1) {
                //console.log(item);

                var sql3 = sqlMap.teacher.select_stu_first_regular;
                query(sql3, [addsql.teaID, item], function (err, result) {
                    if (err) {
                        console.log("[SELECT ERRO]:", err.message);
                        data.err = "服务器错误";
                    } else {
                        //console.log(result);
                        if (result[0]) {
                            result.forEach(function (d) {
                                data.stuList.push(d);
                            });
                            //console.log(data);
                        }
                    }
                    callback(null, item);
                });
                // } else if (systemset.batch.regular[item] == 2) {
                //   var sql4 = sqlMap.teacher.select_stu_second_regular;
                //   query(sql4, [addsql.teaID, item], function(err, result) {
                //     if (err) {
                //       console.log("[SELECT ERRO]:", err.message);
                //       data.err = "服务器错误";
                //     } else {
                //       if (result[0]) {
                //         result.forEach(function(d) {
                //           data.stuList.push(d);
                //         });
                //       }
                //     }
                //   });
                // }

            },
            function (err) {
                //console.log(data);
                async.eachSeries(
                    data.stuList,
                    function (item, callback) {
                        query(sql1, item.stuNum, function (err, result) {
                            if (err) {
                                console.log("[SELECT ERROR]:", err.message);
                                data.err = "服务器错误";
                            } else {
                                var body = JSON.parse(result[0].tableBody);
                                for (var i = 0; i < systemset.tableList.length; i++) {
                                    item[systemset.tableList[i].name] =
                                        body[systemset.tableList[i].name];
                                }
                            }
                            callback(null, item);
                        });
                    },
                    function (err) {
                        if (err) {
                            data.err = err;
                        } else {
                            res.send(data);
                        }
                    }
                );
            }





        );
        console.log(data)
    } else {}
};
var selectstu = function (req, res) {
    //var addsql=req.body;
    var addsql = {
        teaID: "1001",
        type: "regular",
        selStuList: [{
                stuID: "201701010101",
                recept: true
            },
            {
                stuID: "201701010102",
                recept: false
            }
        ]
    };
    var data = {
        success: true
    };
    //先查询这个老师是第一志愿还是第二志愿老师
    var rsql1 = sqlMap.teacher.select_teafirst_regular;
    var rsql2 = sqlMap.teacher.select_teasecond_regular;

    var gsql1 = sqlMap.teacher.select_teafirst_graduate;
    var gsql2 = sqlMap.teacher.select_teasecond_graduate;
    //如果是第一志愿则修改第一志愿
    var rsql11 = sqlMap.teacher.receive_first_regular;
    var rsql10 = sqlMap.teacher.refuse_first_regular;
    var rsql21 = sqlMap.teacher.receive_second_regular;
    var rsql20 = sqlMap.teacher.refuse_second_regular;

    var gsql11 = sqlMap.teacher.receive_first_graduate;
    var gsql10 = sqlMap.teacher.refuse_first_graduate;
    var gsql21 = sqlMap.teacher.receive_second_graduate;
    var gsql20 = sqlMap.teacher.refuse_second_graduate;

    if (addsql.type === "regular") {
        for (let i = 0; i < addsql.selStuList.length; i++) {
            let ifRecept = addsql.selStuList[i].recept;
            let stuNum = addsql.selStuList[i].stuID;
            query(rsql1, addsql.teaID, function (err, result) {
                if (err) {
                    console.log("[SELECT ERRO]:", err.message);
                    data.success = false;
                    res.send(data);
                } else {
                    //如果在第一志愿找不到那么找第二志愿
                    if (result[0] === undefined) {
                        query(rsql2, addsql.teaID, function (err, result) {
                            if (err) {
                                console.log("[SELECT ERRO]:", err.message);
                                data.success = false;
                                res.send(data);
                            } else {
                                if (ifRecept == true) {
                                    query(rsql21, stuNum, function (err, ret) {
                                        if (err) {
                                            console.log("[UPDATE ERRO]:", err.message);
                                            data.success = false;
                                            res.send(data);
                                        }
                                    });
                                } else {
                                    query(rsql20, stuNum, function (err, ret) {
                                        if (err) {
                                            console.log("[UPDATE ERRO]:", err.message);
                                            data.success = false;
                                            res.send(data);
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        if (ifRecept == true) {
                            query(rsql11, stuNum, function (err, ret) {
                                if (err) {
                                    console.log("[UPDATE ERRO]:", err.message);
                                    data.success = false;
                                    res.send(data);
                                }
                            });
                        } else {
                            query(rsql10, stuNum, function (err, ret) {
                                if (err) {
                                    console.log("[UPDATE ERRO]:", err.message);
                                    data.success = false;
                                    res.send(data);
                                }
                            });
                        }
                    }
                }
            });
        }
        res.send(data);
    } else {
        for (let i = 0; i < addsql.selStuList.length; i++) {
            let ifRecept = addsql.selStuList[i].recept;
            let stuNum = addsql.selStuList[i].stuID;
            query(gsql1, addsql.teaID, function (err, result) {
                if (err) {
                    console.log("[SELECT ERRO]:", err.message);
                    data.success = false;
                    res.send(data);
                } else {
                    //如果在第一志愿找不到那么找第二志愿
                    if (result[0] === undefined) {
                        query(gsql2, addsql.teaID, function (err, result) {
                            if (err) {
                                console.log("[SELECT ERRO]:", err.message);
                                data.success = false;
                                res.send(data);
                            } else {
                                if (ifRecept == true) {
                                    query(gsql21, stuNum, function (err, ret) {
                                        if (err) {
                                            console.log("[UPDATE ERRO]:", err.message);
                                            data.success = false;
                                            res.send(data);
                                        }
                                    });
                                } else {
                                    query(gsql20, stuNum, function (err, ret) {
                                        if (err) {
                                            console.log("[UPDATE ERRO]:", err.message);
                                            data.success = false;
                                            res.send(data);
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        if (ifRecept == true) {
                            query(gsql11, stuNum, function (err, ret) {
                                if (err) {
                                    console.log("[UPDATE ERRO]:", err.message);
                                    data.success = false;
                                    res.send(data);
                                }
                            });
                        } else {
                            query(gsql10, stuNum, function (err, ret) {
                                if (err) {
                                    console.log("[UPDATE ERRO]:", err.message);
                                    data.success = false;
                                    res.send(data);
                                }
                            });
                        }
                    }
                }
            });
        }
        res.send(data);
    }
};
var accepted = function (req, res) {
    //var addsql=req.body;
    var addsql = {
        teaID: "1001",
        type: "regular"
    };
    var data = {
        tableList: "",
        stuList: ""
    };
    var sql1 = sqlMap.student.select_file_tableBody_regular;
    var sql2 = sqlMap.student.select_file_tableBody_graduate;
    if (addsql.type === "regular") {
        var sql = sqlMap.teacher.select_result_regular;
        query(sql, addsql.teaID, function (err, result) {
            if (err) {
                console.log("[SELECT ERRO]:", err.message);
                res.send(data);
            } else {
                data.stuList = result;
                if (data.stuList[0]) {
                    data.stuList.forEach(function (d, i) {
                        query(sql1, d.stuNum, function (err, result) {
                            if (err) {
                                console.log("[SELECT ERRO]:", err.message);
                                data.err = "服务器错误";
                                res.send(data);
                            } else {
                                var body = JSON.parse(result[0].tableBody);
                                for (var j = 0; j < data.tableList.length; j++) {
                                    d[data.tableList[j].name] = body[data.tableList[j].name];
                                    if (
                                        i == data.stuList.length - 1 &&
                                        j == systemset.tableList.length - 1
                                    ) {
                                        res.send(data);
                                    }
                                }
                            }
                        });
                    });
                } else {
                    res.send(data);
                }
            }
        });
    } else {
        var sql0 = sqlMap.teacher.select_result_graduate;
        query(sql0, addsql.teaID, function (err, result) {
            if (err) {
                console.log("[SELECT ERRO]:", err.message);
                res.send(data);
            } else {
                data.stuList = result;
                if (data.stuList[0]) {
                    data.stuList.forEach(function (d, i) {
                        query(sql2, d.stuNum, function (err, result) {
                            if (err) {
                                console.log("[SELECT ERRO]:", err.message);
                                data.err = "服务器错误";
                                res.send(data);
                            } else {
                                var body = JSON.parse(result[0].tableBody);
                                for (var j = 0; j < data.tableList.length; j++) {
                                    d[data.tableList[j].name] = body[data.tableList[j].name];
                                    if (
                                        i == data.stuList.length - 1 &&
                                        j == systemset.tableList.length - 1
                                    ) {
                                        res.send(data);
                                    }
                                }
                            }
                        });
                    });
                } else {
                    res.send(data);
                }
            }
        });
    }
};
module.exports = {
    login,
    info,
    changeinfo,
    stuinfo,
    selectstu,
    accepted
};
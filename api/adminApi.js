var query = require("../util");
var sqlMap = require("../sqlMap");
var systemset = require("../systemset.json");
var async = require("async")
var login = function (req, res, next) {
    var sql = sqlMap.admin.login;
    //var addsql = req.body;
    var data = {
        success: false
    };
    var addsql = {
        admNum: "123456",
        admPass: "12345"
    };
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
                    data.grades = resultArray.adminGrade;
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
    };
    var addsql = {
        grade: "2017",
        type: "regular"
    };
    query(sql0, addsql.grade, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            data.err = "服务器错误";
            res.send(data);
        } else {
            data.stuList = result;
            if (addsql.type == "regular") {
                var sql1 = sqlMap.student.select_file_tableBody_regular;
                var sql2 = sqlMap.student.select_choice_regular_first;
                var sql3 = sqlMap.student.select_choice_regular_second;

                async (data.stuList, function (item, callback) {
                    query(sql1, item.stuNum, function (err, result) {
                        if (err) {
                            console.log("[SELECT ERROR]:", err.message);
                            data.err = "文件信息查询错误";
                            callback(err);
                        } else {
                            var body = JSON.parse(result[0].tableBody);
                            for (var i = 0; i < data.tableList.length; i++) {
                                item[data.tableList[i].name] = body[data.tableList[i].name];
                            }
                            query(sql2, item.stuNum, function (err, result) {
                                if (err) {
                                    console.log("[SELECT ERROR]:", err.message);
                                    data.err = "第一志愿查询错误";
                                    callback(err);
                                } else {
                                    if (result[0]) {
                                        item.firstChoice = result[0];
                                    } else {
                                        item.firstChoice = {}
                                    }
                                    query(sql3, item.stuNum, function (err, result) {
                                        if (err) {
                                            console.log("[SELECT ERROR]:", err.message);
                                            data.err = "第二志愿查询错误";
                                        } else {
                                            if (result[0]) {
                                                item.secondChoice = result[0];
                                            } else {
                                                item.secondChoice = {};
                                            }
                                            callback(null, item);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }, function (err) {
                    res.send(data);
                });
            } else {
                var sql4 = sqlMap.student.select_file_tableBody_graduate;
                var sql5 = sqlMap.student.select_choice_graduate_first;
                var sql6 = sqlMap.student.select_choice_graduate_second;
                async (data.stuList, function (item, callback) {
                    query(sql4, item.stuNum, function (err, result) {
                        if (err) {
                            console.log("[SELECT ERROR]:", err.message);
                            data.err = "文件信息查询错误";
                            callback(err);
                        } else {
                            var body = JSON.parse(result[0].tableBody);
                            for (var i = 0; i < data.tableList.length; i++) {
                                item[data.tableList[i].name] = body[data.tableList[i].name];
                            }
                            query(sql5, item.stuNum, function (err, result) {
                                if (err) {
                                    console.log("[SELECT ERROR]:", err.message);
                                    data.err = "第一志愿查询错误";
                                    callback(err);
                                } else {
                                    if (result[0]) {
                                        item.firstChoice = result[0];
                                    } else {
                                        item.firstChoice = {}
                                    }
                                    query(sql6, item.stuNum, function (err, result) {
                                        if (err) {
                                            console.log("[SELECT ERROR]:", err.message);
                                            data.err = "第二志愿查询错误";
                                        } else {
                                            if (result[0]) {
                                                item.secondChoice = result[0];
                                            } else {
                                                item.secondChoice = {};
                                            }
                                            callback(null, item);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }, function (err) {
                    res.send(data);
                });
            }
        }
    });
};
var situation = function (req, res, next) {
    var addsql = req.body;
    /*var addsql={
          admNum:'123456',
          type:'regular',
          batch:1
      }*/
    var data = {
        stuList: ""
    };
    if (type === "regular") {
        if (batch == 1) {
            var sql0 = sqlMap.admin.select_first_regular;
            query(sql0, addsql.grade, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    res.send(data);
                } else {
                    data.stuList = result;
                    var sql = sqlMap.admin.update_result_regularid;
                    async (data.stuList, function (d, callback) {
                        if (d.status === 'accept') {
                            query(sql, [d.teaID, d.stuNum], function (err, result) {
                                if (err) {
                                    console.log("[UPDATE ERROR]:", err.message);
                                    data.err = "result表更新失败",
                                        callback(err)
                                } else {
                                    callback(null, d)
                                }
                            });
                        } else {
                            callback(null, d)
                        }
                    }, function (err) {
                        res.send(data);
                    }); //如果一志愿被录取，则更新result表
                }
            });
        } else if (batch == 2) {
            var sql1 = sqlMap.admin.select_second_regular;
            query(sql1.addsql.grade, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    res.send(data);
                } else {
                    data.stuList = result;
                    var sql = sqlMap.admin.update_result_regularid;
                    async (data.stuList, function (d, callback) {
                        if (d.status === 'accept') {
                            query(sql, [d.teaID, d.stuNum], function (err, result) {
                                if (err) {
                                    console.log("[UPDATE ERROR]:", err.message);
                                    data.err = "result表更新失败",
                                        callback(err)
                                } else {
                                    callback(null, d)
                                }
                            });
                        } else {
                            callback(null, d)
                        }
                    }, function (err) {
                        res.send(data);
                    });
                }
            });
        } else {}
    } else {
        if (batch == 1) {
            var sql2 = sqlMap.admin.select_first_graduate;
            query(sql2, addsql.grade, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    res.send(data);
                } else {
                    data.stuList = result;
                    //如果一志愿被录取，则更新result表
                    var sql = sqlMap.admin.update_result_graduateid;
                    async (data.stuList, function (d, callback) {
                        if (d.status === 'accept') {
                            query(sql, [d.teaID, d.stuNum], function (err, result) {
                                if (err) {
                                    console.log("[UPDATE ERROR]:", err.message);
                                    data.err = "result表更新失败",
                                        callback(err)
                                } else {
                                    callback(null, d)
                                }
                            });
                        } else {
                            callback(null, d)
                        }
                    }, function (err) {
                        res.send(data);
                    });

                }
            });
        } else if (batch == 2) {
            var sql3 = sqlMap.admin.select_second_graduate;
            query(sql3.addsql.grade, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    res.send(data);
                } else {
                    data.stuList = result;
                    var sql = sqlMap.admin.update_result_graduateid;
                    async (data.stuList, function (d, callback) {
                        if (d.status === 'accept') {
                            query(sql, [d.teaID, d.stuNum], function (err, result) {
                                if (err) {
                                    console.log("[UPDATE ERROR]:", err.message);
                                    data.err = "result表更新失败",
                                        callback(err)
                                } else {
                                    callback(null, d)
                                }
                            });
                        } else {
                            callback(null, d)
                        }
                    }, function (err) {
                        res.send(data);
                    });
                }
            });
        } else {}
    }
};
var undistri = function (req, res, next) {
    //var addsql=req.body;
    var addsql = {
        grade: '2017',
        type: "regular"
    };
    var data = {
        stuList: ""
    };
    if (type === "regular") {
        var sql = sqlMap.admin.select_resultnull_regularid;
        query(sql, addsql.grade, function (err, result) {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                data.err = "服务器错误";
                res.send(data);
            }
            data.stuList = result;
            res.send(data);
        });
    } else {
        var sql1 = sqlMap.admin.select_resultnull_graduateid;
        query(sql1, addsql.grade, function (err, result) {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                data.err = "服务器错误";
                res.send(data);
            }
            data.stuList = result;
            res.send(data);
        });
    }
};
var setbatch = function (req, res, next) {
    //var addsql=req.body;
    var addsql = {
        admNum: "123456",
        type: "regular",
        batch: 1
    };
    var data = {
        success: false
    };
    //初始值为1
    var rbatch = 1;
    var gbatch = 1;
    var rsql = sqlMap.admin.update_batch_regular;
    var gsql = sqlMap.admin.update_batch_graduate;
    if (type === "regular") {
        if (batch == 1) {
            var sql0 = sqlMap.admin.first_success_regular;
            query(sql0, addsql.admNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                if (result.length == 0) {
                    data.success = true;
                    //如果一轮全部处理，则修改rbatch为2
                    rbatch = 2;
                    query(rsql, [rbatch, addsql.admNum], function (err, result) {
                        if (err) {
                            console.log("[UPDATE ERROR]", err.message);
                        }
                        console, log("batch修改成功");
                    });
                }
                res.send(data);
            });
        } else if (batch == 2) {
            var sql1 = sqlMap.admin.second_success_regular;
            query(sql1, addsql.admNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                if (result.length == 0) {
                    data.success = true;
                    //如果二轮全部处理，则修改rbatch为3
                    rbatch = 3;
                    query(rsql, [rbatch, addsql.admNum], function (err, result) {
                        if (err) {
                            console.log("[UPDATE ERROR]", err.message);
                        }
                        console, log("batch修改成功");
                    });
                }
                res.send(data);
            });
        } else if (batch == 3) {
            //result表里的不调剂的学生都有导师，则成功
            var sql2 = sqlMap.admin.select_resultall_regularid;
            query(sql2, addsql.admNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                if (result.length == 0) {
                    data.success = true;
                    //修改batch为4
                    rbatch = 4;
                    query(rsql, [rbatch, addsql.admNum], function (err, result) {
                        if (err) {
                            console.log("[UPDATE ERROR]", err.message);
                        }
                        console, log("batch修改成功");
                    });
                }
                res.send(data);
            });
        } else if (batch == 4) {
            var sql3 = sqlMap.admin.select_time_regular;
            query(sql3, addsql.admNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                if (result[0].rpstart == null || result[0].rpend == null) {
                    res.send(data);
                }
                data.success = true;
                //修改batch为4
                rbatch = 5;
                query(rsql, [rbatch, addsql.admNum], function (err, result) {
                    if (err) {
                        console.log("[UPDATE ERROR]", err.message);
                    }
                    console, log("batch修改成功");
                });
                res.send(data);
            });
        } else {
            //判断现在时间与结束时间是否相同
            var sql4 = sqlMap.admin.select_time_regular;
            query(sql4, addsql.stuNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                var oldtime = new Date(result[0].rpend);
                var newtime = new Date();
                if (newtime - oldtime == 0) {
                    data.success = true;
                }
                res.send(data);
            });
        }
    } else {
        if (batch == 1) {
            var sql0 = sqlMap.admin.first_success_graduate;
            query(sql0, addsql.admNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                if (result.length == 0) {
                    data.success = true;
                    //如果一轮全部处理，则修改rbatch为2
                    gbatch = 2;
                    query(rsql, [gbatch, addsql.admNum], function (err, result) {
                        if (err) {
                            console.log("[UPDATE ERROR]", err.message);
                        }
                        console, log("batch修改成功");
                    });
                }
                res.send(data);
            });
        } else if (batch == 2) {
            var sql1 = sqlMap.admin.second_success_graduate;
            query(sql1, addsql.admNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                if (result.length == 0) {
                    data.success = true;
                    //如果二轮全部处理，则修改rbatch为3
                    gbatch = 3;
                    query(rsql, [gbatch, addsql.admNum], function (err, result) {
                        if (err) {
                            console.log("[UPDATE ERROR]", err.message);
                        }
                        console, log("batch修改成功");
                    });
                }
                res.send(data);
            });
        } else if (batch == 3) {
            //result表里的不调剂的学生都有导师，则成功
            var sql2 = sqlMap.admin.select_resultall_graduateid;
            query(sql2, addsql.admNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                if (result.length == 0) {
                    data.success = true;
                    //修改batch为4
                    gbatch = 4;
                    query(rsql, [gbatch, addsql.admNum], function (err, result) {
                        if (err) {
                            console.log("[UPDATE ERROR]", err.message);
                        }
                        console, log("batch修改成功");
                    });
                }
                res.send(data);
            });
        } else if (batch == 4) {
            var sql3 = sqlMap.admin.select_time_graduate;
            query(sql3, addsql.admNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                if (result[0].gpstart == null || result[0].gpend == null) {
                    res.send(data);
                }
                data.success = true;
                //修改batch为4
                gbatch = 5;
                query(rsql, [gbatch, addsql.admNum], function (err, result) {
                    if (err) {
                        console.log("[UPDATE ERROR]", err.message);
                    }
                    console, log("batch修改成功");
                });
                res.send(data);
            });
        } else {
            //判断现在时间与结束时间是否相同
            var sql4 = sqlMap.admin.select_time_graduate;
            query(sql4, addsql.stuNum, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    res.send(data);
                }
                var oldtime = new Date(result[0].gpend);
                var newtime = new Date();
                if (newtime - oldtime == 0) {
                    data.success = true;
                }
                res.send(data);
            });
        }
    }
};
var querybatch = function (req, res, next) {
    //var addsql=req.body;
    var addsql = {
        admNum: "123456",
        type: "regular"
    };
    var data = {
        batch: 1
    };
    if (type === "regular") {
        var sql0 = sqlMap.admin.select_batch_regular;
        query(sql0, admNum, function (err, result) {
            if (err) {
                console.log("SELECT ERROR", err.message);
                res.send(data);
            }
            data.batch = result;
            res.send(data);
        });
    } else {
        var sql1 = sqlMap.admin.select_batch_graduate;
        query(sql1, admNum, function (err, result) {
            if (err) {
                console.log("SELECT ERROR", err.message);
                res.send(data);
            }
            data.batch = result;
            res.send(data);
        });
    }
};
//手动分配
var manual = function (req, res, next) {
    // var addsql=req.body;
    var addsql = {
        admNum: "123456",
        type: "regular",
        manualList: [{
            stuID: "201701010103",
            teaID: "199901010102"
        }]
    };
    var data = {
        success: false
    };
    if (type === "regular") {
        var sql0 = sqlMap.admin.update_result_regularid;
        addsql.manualList.forEach(function (d, i) {
            query(sql0, [d.stuID, d.teaID], function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    res.send(data);
                    break;
                } else {
                    if (i == addsql.manualList.length) {
                        data.success = true;
                        res.send(data);
                    }
                }
            });
        });
    } else {
        var sql1 = sqlMap.admin.update_result_graduateid;
        addsql.manualList.forEach(function (d, i) {
            query(sql1, [d.stuID, d.teaID], function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    res.send(data);
                    break;
                } else {
                    if (i == addsql.manualList.length) {
                        data.success = true;
                        res.send(data);
                    }
                }
            });
        });
        data.success = true;
        res.send(data);
    }
};
var setpub = function (req, res, next) {
    //var addsql=req.body;
    var addsql = {
        admNum: "123456",
        type: "regular",
        start: "2020-02-03T16:00:00.000Z",
        end: "2020-02-28T16:00:00.000Z"
    };
    var data = {
        sucess: false
    };
    if (type === "regular") {
        var sql0 = sqlMap.admin.update_time_regular;
        query(sql0, [addsql.start, addsql.end, addsql.admNum], function (
            err,
            result
        ) {
            if (err) {
                console.log("[UPDATE ERROR]:", err.message);
                res.send(data);
            } else {
                data.sucess = true;
                res.send(data);
            }
        });
    } else {
        var sql1 = sqlMap.admin.update_time_graduate;
        query(sql1, [addsql.start, addsql.end, addsql.admNum], function (
            err,
            result
        ) {
            if (err) {
                console.log("[UPDATE ERROR]:", err.message);
                res.send(data);
            } else {
                data.sucess = true;
                res.send(data);
            }
        });
    }
};
var querypub = function (req, res, next) {
    //var addsql=req.body;
    var addsql = {
        admNum: "123456",
        type: "regular"
    };
    var data = {
        start: "",
        end: ""
    };
    if (type === "regular") {
        var sql0 = sqlMap.admin.select_time_regular;
        query(sql0, addsql.admNum, function (err, result) {
            if (err) {
                console.log("SELECT ERROR", err.message);
                res.send(data);
            } else {
                data.start = result.rpstart;
                data.end = result.rpend;
                res.send(data);
            }
        });
    } else {
        var sql1 = sqlMap.admin.select_time_graduate;
        query(sql1, addsql.admNum, function (err, result) {
            if (err) {
                console.log("SELECT ERROR", err.message);
                res.send(data);
            } else {
                data.start = result.gpstart;
                data.end = result.gpend;
                res.send(data);
            }
        });
    }
};
var final = function (req, res, next) {
    //var addsql=req.body;
    var addsql = {
        admNum: "123456",
        type: "regular"
    };
    var data = {
        stuList: ""
    };
    if (type === "regular") {
        var sql0 = sqlMap.admin.select_final_regular;
        query(sql0, addsql.admNum, function (err, result) {
            if (err) {
                console.log("SELECT ERROR", err.message);
                res.send(data);
            } else {
                data.stuList = result;
                res.send(data);
            }
        });
    } else {
        var sql1 = sqlMap.admin.select_final_graduate;
        query(sql1, addsql.admNum, function (err, result) {
            if (err) {
                console.log("SELECT ERROR", err.message);
                res.send(data);
            } else {
                data.stuList = result;
                res.send(data);
            }
        });
    }
};
module.exports = {
    login,
    stulist,
    situation,
    undistri,
    manual,
    setpub,
    querypub,
    querybatch,
    setbatch,
    final
};
var query = require("../util");
var sqlMap = require("../sqlMap");
var systemset = require("../systemset.json");
var fs = require('fs');
var async = require("async");
var login = function (req, res, next) {
    var sql = sqlMap.admin.login;
    var addsql = req.body;
    var data = {
        success: false
    };
    // var addsql = {
    //     admNum: "123456",
    //     admPass: "12345"
    // };
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
    var addsql = req.body;
    var data = {
        stuList: [],
        tableList: systemset.tableList
    };
    // var addsql = {
    //     grade: "2017",
    //     type: "regular"
    // };
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
                async.eachSeries(
                    data.stuList,
                    function (item, callback) {
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
                                            item.firstChoice = {};
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
                    },
                    function (err) {
                        res.send(data);
                    }
                );
            } else {
                var sql4 = sqlMap.student.select_file_tableBody_graduate;
                var sql5 = sqlMap.student.select_choice_graduate_first;
                var sql6 = sqlMap.student.select_choice_graduate_second;
                async.eachSeries(
                    data.stuList,
                    function (item, callback) {
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
                                            item.firstChoice = {};
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
                    },
                    function (err) {
                        res.send(data);
                    }
                );
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
    if (addsql.type === "regular") {
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
                    async.eachSeries(
                        data.stuList,
                        function (d, callback) {
                            if (d.status === "accept") {
                                query(sql, [d.teaID, d.stuNum], function (err, result) {
                                    if (err) {
                                        console.log("[UPDATE ERROR]:", err.message);
                                        (data.err = "result表更新失败"), callback(err);
                                    } else {
                                        callback(null, d);
                                    }
                                });
                            } else {
                                callback(null, d);
                            }
                        },
                        function (err) {
                            res.send(data);
                        }
                    ); //如果一志愿被录取，则更新result表
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
                    async.eachSeries(
                        data.stuList,
                        function (d, callback) {
                            if (d.status === "accept") {
                                query(sql, [d.teaID, d.stuNum], function (err, result) {
                                    if (err) {
                                        console.log("[UPDATE ERROR]:", err.message);
                                        (data.err = "result表更新失败"), callback(err);
                                    } else {
                                        callback(null, d);
                                    }
                                });
                            } else {
                                callback(null, d);
                            }
                        },
                        function (err) {
                            res.send(data);
                        }
                    );
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
                    async.eachSeries(
                        data.stuList,
                        function (d, callback) {
                            if (d.status === "accept") {
                                query(sql, [d.teaID, d.stuNum], function (err, result) {
                                    if (err) {
                                        console.log("[UPDATE ERROR]:", err.message);
                                        (data.err = "result表更新失败"), callback(err);
                                    } else {
                                        callback(null, d);
                                    }
                                });
                            } else {
                                callback(null, d);
                            }
                        },
                        function (err) {
                            res.send(data);
                        }
                    );
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
                    async.eachSeries(
                        data.stuList,
                        function (d, callback) {
                            if (d.status === "accept") {
                                query(sql, [d.teaID, d.stuNum], function (err, result) {
                                    if (err) {
                                        console.log("[UPDATE ERROR]:", err.message);
                                        (data.err = "result表更新失败"), callback(err);
                                    } else {
                                        callback(null, d);
                                    }
                                });
                            } else {
                                callback(null, d);
                            }
                        },
                        function (err) {
                            res.send(data);
                        }
                    );
                }
            });
        } else {}
    }
};
var undistri = function (req, res, next) {
    var addsql = req.body;
    // var addsql = {
    //     grade: "2017",
    //     type: "regular"
    // };
    var data = {
        stuList: ""
    };
    if (addsql.type === "regular") {
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
    var addsql = req.body;
    // var addsql = {
    //     grade: '2017',
    //     type: 'regular',
    //     batch: 2
    // }
    var data = {
        success: false
    };
    //初始值为1
    if (addsql.type === "regular") {
        if (systemset.batch.regular[addsql.grade] === 1) {
            if (addsql.batch === 2) {
                var sql0 = sqlMap.admin.first_success_regular;
                query(sql0, addsql.grade, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.success = false;
                        data.err = "第一批志愿确认错误"
                        res.send(data);
                    } else {
                        if (result[0]) {
                            data.success = false;
                            data.err = "仍有第一批志愿未被确认"
                            res.send(data);
                        } else {
                            systemset.batch.regular[addsql.grade] = 2;
                            var str = JSON.stringify(systemset);
                            fs.writeFile('systemset.json', str, function (err) {
                                if (err) {
                                    data.success = false;
                                    data.err = "写入失败";
                                    res.send(data);
                                } else {
                                    console.log(str);
                                    data.success = true;
                                    res.send(data);
                                }
                            })
                        }
                    }
                });
            } else {
                data.success = false;
                data.err = "非法进度转换";
                res.send(data);
            }
        } else if (systemset.batch.regular[addsql.grade] === 2) {
            if (addsql.batch === 3) {
                var sql1 = sqlMap.admin.second_success_regular;
                query(sql1, addsql.grade, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "第二批志愿确认错误"
                        res.send(data);
                    } else {
                        if (result[0]) {
                            data.success = false;
                            data.err = "仍有第二批志愿未被确认"
                            res.send(data);
                        } else {
                            //如果二轮全部处理，则修改rbatch为3
                            systemset.batch.regular[addsql.grade] = 3;
                            var str = JSON.stringify(systemset);
                            fs.writeFile('systemset.json', str, function (err) {
                                if (err) {
                                    data.success = false;
                                    data.err = "写入失败";
                                    res.send(data);
                                } else {
                                    data.success = true;
                                    res.send(data);
                                }
                            })
                        }
                    }
                });
            } else {
                data.success = false;
                data.err = "非法进度转换";
                res.send(data);
            }
        } else if (systemset.batch.regular[addsql.grade] === 3) {
            if (addsql.batch === 4) {
                //result表里的不调剂的学生都有导师，则成功

                var sql2 = sqlMap.admin.select_resultall_regularid;
                query(sql2, addsql.grade, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "最终结果确认错误"
                        res.send(data);
                    } else {

                        if (result[0]) {
                            data.success = false;
                            data.err = "仍有学生未被调剂"
                            res.send(data);
                        } else {
                            systemset.batch.regular[addsql.grade] = 4;
                            var str = JSON.stringify(systemset);
                            fs.writeFile('systemset.json', str, function (err) {
                                if (err) {
                                    data.success = false;
                                    data.err = "写入失败";
                                    res.send(data);
                                } else {
                                    data.success = true;
                                    res.send(data);
                                }
                            })
                        }
                    }
                });
            } else {
                data.success = false;
                data.err = "非法进度转换";
                res.send(data);
            }
        } else if (systemset.batch.regular[addsql.grade] === 4) {
            if (addsql.batch === 4) {
                systemset.batch.regular[addsql.grade] = 4;
                var str = JSON.stringify(systemset);
                fs.writeFile('../systemset.json', str, function (err) {
                    if (err) {
                        data.success = false;
                        data.err = "写入失败";
                        res.send(data);
                    } else {
                        data.success = true;
                        res.send(data);
                    }
                })
            } else {
                data.success = false;
                data.err = "非法进度转换";
                res.send(data);
            }
        } else {
            data.success = false;
            data.err = "非法进度转换";
            res.send(data);
        }
    } else {
        if (systemset.batch.graduate[addsql.grade] === 1) {
            if (addsql.batch === 2) {
                var sql3 = sqlMap.admin.first_success_graduate;
                query(sql3, addsql.grade, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.success = false;
                        data.err = "第一批志愿确认错误"
                        res.send(data);
                    } else {
                        if (result[0]) {
                            data.success = false;
                            data.err = "仍有第一批志愿未被确认"
                            res.send(data);
                        } else {
                            systemset.batch.graduate[addsql.grade] = 2;
                            var str = JSON.stringify(systemset);
                            fs.writeFile('systemset.json', str, function (err) {
                                if (err) {
                                    data.success = false;
                                    data.err = "写入失败";
                                    res.send(data);
                                } else {
                                    data.success = true;
                                    res.send(data);
                                }
                            })
                        }
                    }
                });
            } else {
                data.success = false;
                data.err = "非法进度转换";
                res.send(data);
            }
        } else if (systemset.batch.graduate[addsql.grade] === 2) {
            if (addsql.batch === 3) {
                var sql4 = sqlMap.admin.second_success_graduate;
                query(sql4, addsql.grade, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "第二批志愿确认错误"
                        res.send(data);
                    } else {
                        if (result[0]) {
                            data.success = false;
                            data.err = "仍有第二批志愿未被确认"
                            res.send(data);
                        } else {
                            //如果二轮全部处理，则修改rbatch为3
                            systemset.batch.graduate[addsql.grade] = 3;
                            var str = JSON.stringify(systemset);
                            fs.writeFile('systemset.json', str, function (err) {
                                if (err) {
                                    data.success = false;
                                    data.err = "写入失败";
                                    res.send(data);
                                } else {
                                    data.success = true;
                                    res.send(data);
                                }
                            })
                        }
                    }
                });
            } else {
                data.success = false;
                data.err = "非法进度转换";
                res.send(data);
            }
        } else if (systemset.batch.graduate[addsql.grade] === 3) {
            if (addsql.batch === 4) {
                //result表里的不调剂的学生都有导师，则成功

                var sql5 = sqlMap.admin.select_resultall_graduateid;
                query(sql5, addsql.grade, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "最终结果确认错误"
                        res.send(data);
                    } else {

                        if (result[0]) {
                            data.success = false;
                            data.err = "仍有学生未被调剂"
                            res.send(data);
                        } else {
                            systemset.batch.graduate[addsql.grade] = 4;
                            var str = JSON.stringify(systemset);
                            fs.writeFile('systemset.json', str, function (err) {
                                if (err) {
                                    data.success = false;
                                    data.err = "写入失败";
                                    res.send(data);
                                } else {
                                    data.success = true;
                                    res.send(data);
                                }
                            })
                        }
                    }
                });
            } else {
                data.success = false;
                data.err = "非法进度转换";
                res.send(data);
            }
        } else if (systemset.batch.graduate[addsql.grade] === 4) {
            if (addsql.batch === 4) {
                systemset.batch.graduate[addsql.grade] = 4;
                var str1 = JSON.stringify(systemset);
                fs.writeFile('systemset.json', str1, function (err) {
                    if (err) {
                        data.success = false;
                        data.err = "写入失败";
                        res.send(data);
                    } else {
                        data.success = true;
                        res.send(data);
                    }
                })
            } else {
                data.success = false;
                data.err = "非法进度转换";
                res.send(data);
            }
        } else {
            data.success = false;
            data.err = "非法进度转换";
            res.send(data);
        }
    }
}
var querybatch = function (req, res, next) {
    var addsql = req.body;
    // var addsql = {
    //     grade: '2017',
    //     type: "regular"
    // };
    var data = {};
    if (addsql.type === 'regular') {
        data.batch = systemset.batch.regular[addsql.grade];
    } else {
        data.batch = systemset.batch.graduate[addsql.grade];
    }
    res.send(data);

};
//手动分配
var manual = function (req, res, next) {
    var addsql = req.body;
    // var addsql = {
    //     admNum: "123456",
    //     type: "regular",
    //     manualList: [{
    //         stuID: "201701010103",
    //         teaID: "199901010102"
    //     }]
    // };
    var data = {
        success: true
    };
    if (type === "regular") {
        var sql0 = sqlMap.admin.update_result_regularid;
        async.eachSeries(addsql.manualList, function (d, callback) {
            query(sql0, [d.stuID, d.teaID], function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    data.success = false;
                    callback(err)

                } else {
                    callback(null, d);
                }
            });
        }, function (err) {
            res.send(data)
        });
    } else {
        var sql1 = sqlMap.admin.update_result_graduateid;
        async.eachSeries(addsql.manualList, function (d, callback) {
            query(sql1, [d.stuID, d.teaID], function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    data.success = false;
                    callback(err)

                } else {
                    callback(null, d);
                }
            });
        }, function (err) {
            res.send(data)
        });
    }
};
var setpub = function (req, res, next) {
    var addsql = req.body;
    // var addsql = {
    //     grade: '2017',
    //     type: 'regular',
    //     start: '2020-02-03T16:00:00.000Z',
    //     end: '2020-02-28T16:00:00.000Z'
    // }
    var data = {
        sucess: false
    };
    if (addsql.type === "regular") {
        systemset.start.regular[addsql.grade] = addsql.start;
        systemset.end.regular[addsql.grade] = addsql.end;
        var str = JSON.stringify(systemset);
        fs.writeFile('systemset.json', str, function (err) {
            if (err) {
                data.success = false;
                data.err = "写入失败";
                res.send(data);
            } else {
                data.success = true;
                res.send(data);
            }
        });
    } else {
        systemset.start.graduate[addsql.grade] = addsql.start;
        systemset.end.graduate[addsql.grade] = addsql.end;
        var str1 = JSON.stringify(systemset);
        fs.writeFile('systemset.json', str1, function (err) {
            if (err) {
                data.success = false;
                data.err = "写入失败";
                res.send(data);
            } else {
                data.success = true;
                res.send(data);
            }
        });
    }
};
var querypub = function (req, res, next) {
    var addsql = req.body;
    // var addsql = {
    //     grade: '2017',
    //     type: 'regular'
    // }
    var data = {
        start: "",
        end: ""
    };
    if (type === "regular") {
        data.start = systemset.start.regular[addsql.grade];
        data.end = systemset.end.regular[addsql.grade];
        res.send(data);
    } else {
        data.start = systemset.start.graduate[addsql.grade];
        data.end = systemset.end.graduate[addsql.grade];
        res.send(data);
    }
};
var final = function (req, res, next) {
    var addsql = req.body;
    // var addsql = {
    //     grade: "2017",
    //     type: "regular"
    // };
    var data = {
        stuList: ""
    };
    if (type === "regular") {
        var sql0 = sqlMap.admin.select_final_regular;
        query(sql0, addsql.grade, function (err, result) {
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
        query(sql1, addsql.grade, function (err, result) {
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
var addStu = function (req, res, next) {
    // var addsql = {
    //     grade: "2016",
    //     stuList: [{
    //         name: "张三",
    //         id: "201701010101",
    //         classes: "class1",
    //         contact: "123456789",
    //         initpass: "090617"

    //     }, {
    //         name: "李四",
    //         id: "201701010102",
    //         classes: "class2",
    //         contact: "123456789",
    //         initpass: "090617"
    //     }, {
    //         name: "王五",
    //         id: "201701010103",
    //         classes: "class1",
    //         contact: "123456789",
    //         initpass: "090617"
    //     }]
    // }
    var addsql = req.body;
    var data = {
        success: true
    }
    var sql0 = sqlMap.admin.insert_stu;
    var sql1 = sqlMap.admin.insert_stuaccount;
    var sql2 = sqlMap.admin.insert_result;
    var sql3 = sqlMap.admin.insert_regular;
    var sql4 = sqlMap.admin.insert_graduate;
    async.eachSeries(addsql.stuList, function (item, callback) {
        query(sql0, [item.id, item.name, item.classes, item.contact, addsql.grade], function (err) {
            if (err) {
                data.err = item.id + "加入学生基本信息失败";
                data.success = false;
                callback(err);
            } else {
                query(sql1, [item.id, item.initpass, item.initpass], function (err) {
                    if (err) {
                        data.err = item.id + "加入学生账户失败";
                        data.success = false;
                        callback(err);
                    } else {
                        query(sql2, item.id, function (err) {
                            if (err) {
                                data.err = item.id + "加入结果表失败"
                                data.success = false;
                                callback(err);
                            } else {
                                query(sql3, item.id, function (err) {
                                    if (err) {
                                        data.err = item.id + "加入regular表失败"
                                        data.success = false;
                                        callback(err);
                                    } else {
                                        query(sql4, item.id, function (err) {
                                            if (err) {
                                                data.err = item.id + "加入regular表失败";
                                                data.success = false;
                                                callback(err);
                                            } else {
                                                callback(null, item);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }, function (err) {
        res.send(data)
    });
}
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
    final,
    addStu
};
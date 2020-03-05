var query = require("../util");
var sqlMap = require("../sqlMap");
var systemset = require("../systemset.json");
var stulogin = function (req, res) {
    var sql = sqlMap.student.select_stunum;
    var addsql = req.body;
    var data = {
        success: 0,
        passChanged: 0
    };
    query(sql, addsql.stuID, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            data.err = "服务器错误";
            res.send(data);
        } else {
            if (result[0]) {
                //登录成功
                var resultArray = result[0];
                console.log(resultArray);

                if (resultArray.stuPass == addsql.stuPass) {
                    data.success = 1;
                    data.passChanged = parseInt(resultArray.passChanged);
                    res.send(data);
                } else {
                    data.err = "密码不正确";
                    data.success = 0;
                    res.send(data);
                }
            } else {
                data.err = "用户名不正确";
                data.success = 0;
                res.send(data);
            }
        }
    });
};

var changePass = function (req, res) {
    //修改密码
    var sql = sqlMap.student.select_stunum;
    var addsql = req.body;
    // var addsql = {
    //     stuID: '201706062629',
    //     newPass: '1235',
    // };
    var data = {
        success: false
    };
    query(sql, addsql.stuID, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            data.success = 0;
            data.err = "服务器错误";
            res.send(data);
        } else {
            if (result[0]) {
                var resultArray = result[0];
                if (resultArray.stuPass !== addsql.newPass) {
                    var $sql = sqlMap.student.update_pass;
                    query($sql, [addsql.newPass, addsql.stuID], function (err, result) {
                        if (err) {
                            console.log("[UPDATE ERROR]:", err.message);
                            data.success = false;
                            data.err = "服务器错误";
                            res.send(data);
                        } else {
                            data.success = true;
                            res.send(data);
                        }
                    });
                } else {
                    data.err = "原密码与新密码相同";
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

var allTeacher = function (req, res) {
    var addsql = req.body;
    var data = {
        tutorList: ""
    };
    if (addsql.type) {
        if (addsql.type === "regular") {
            if (addsql.department) {
                var sql00 = sqlMap.student.select_department_regular;
                query(sql00, addsql.department, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "服务器错误";
                        res.send(data);
                    } else {
                        data.tutorList = result;
                        res.send(data);
                    }
                });
            } else {
                var sql0 = sqlMap.student.select_allRegularTeacher;
                query(sql0, null, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "服务器错误";
                        res.send(data);
                    } else {
                        data.tutorList = result;
                        res.send(data);
                    }
                });
            }
        } else if (addsql.type == "graduate") {
            if (addsql.department) {
                var sql10 = sqlMap.student.select_department_graduate;
                query(sql10, addsql.department, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "服务器错误";
                        res.send(data);
                    } else {
                        data.tutorList = result;
                        res.send(data);
                    }
                });
            } else {
                var sql1 = sqlMap.student.select_allGraduateTeacher;
                query(sql1, null, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "服务器错误";
                        res.send(data);
                    } else {
                        data.tutorList = result;
                        res.send(data);
                    }
                });
            }
        }
    } else {
        if (addsql.department) {
            var sql20 = sqlMap.student.select_department;
            query(sql20, addsql.department, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    res.send(data);
                } else {
                    data.tutorList = result;
                    res.send(data);
                }
            });
        } else {
            var sql2 = sqlMap.student.select_allteacher;
            query(sql2, null, function (err, result) {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    data.err = "服务器错误";
                    res.send(data);
                } else {
                    data.tutorList = result;
                    res.send(data);
                }
            });
        }
    }
};

var chooseRegular = function (req, res) {
    var data = {
        success: false
    };
    var addsql = req.body;
    // var addsql = {
    //     stuID: "201706062629",
    //     firstChoice: "1001",
    //     secondChoice: "",
    //     isRedistribute: 0
    // }
    var sql0 = sqlMap.student.update_teacher_regular_isRedistribute;
    var sql1 = sqlMap.student.update_teacher_regular_first;
    var sql2 = sqlMap.student.update_teacher_regular_second;
    query(sql0, [addsql.isRedistribute, addsql.stuID], (err, result) => {
        if (err) {
            console.log("[UPDATE ERRO]:", err.message);
            data.err = "服务器错误（上传调剂信息）";
            res.send(data);
        } else {
            if (addsql.firstChoice) {
                query(sql1, [addsql.firstChoice, addsql.stuID], (err, result) => {
                    if (err) {
                        console.log("[UPDATE ERRO]:", err.message);
                        data.err = "服务器错误（上传第一志愿）";
                        res.send(data);
                    } else {
                        console.log(1);
                        if (addsql.secondChoice) {
                            query(
                                sql2,
                                [addsql.secondChoice, addsql.stuID],
                                (err, result) => {
                                    if (err) {
                                        console.log("[UPDATE ERRO]:", err.message);
                                        data.err = "服务器错误（上传第二志愿）";
                                        res.send(data);
                                    } else {
                                        console.log(1);
                                        data.success = true;
                                        res.send(data);
                                    }
                                }
                            );
                        } else {
                            data.success = true;
                            res.send(data);
                        }
                    }
                });
            } else {
                data.success = true;
                res.send(data);
            }
        }
    });
};

var chooseGraduate = function (req, res) {
    var data = {
        success: false
    };
    var addsql = req.body;
    // var addsql = {
    //     stuID: "201706062629",
    //     firstChoice: "1001",
    //     secondChoice: "",
    //     isRedistribute: 0
    // }
    var sql0 = sqlMap.student.update_teacher_graduate_isRedistribute;
    var sql1 = sqlMap.student.update_teacher_graduate_first;
    var sql2 = sqlMap.student.update_teacher_graduate_second;
    query(sql0, [addsql.isRedistribute, addsql.stuID], function (err, result) {
        if (err) {
            console.log("[UPDATE ERRO]:", err.message);
            data.err = "服务器错误（上传调剂信息）";
            res.send(data);
        } else {
            console.log(1);
            if (addsql.firstChoice) {
                query(sql1, [addsql.firstChoice, addsql.stuID], function (err, result) {
                    if (err) {
                        console.log("[UPDATE ERRO]:", err.message);
                        data.err = "服务器错误（上传第一志愿）";
                        res.send(data);
                    } else {
                        console.log(1);
                        if (addsql.secondChoice) {
                            query(sql2, [addsql.secondChoice, addsql.stuID], function (
                                err,
                                result
                            ) {
                                if (err) {
                                    console.log("[UPDATE ERRO]:", err.message);
                                    data.err = "服务器错误（上传第二志愿）";
                                    res.send(data);
                                } else {
                                    console.log(1);
                                    data.success = true;
                                    res.send(data);
                                }
                            });
                        } else {
                            data.success = true;
                            res.send(data);
                        }
                    }
                });
            } else {
                data.success = true;
                res.send(data);
            }
        }
    });
};

var selectedResult = function (req, res) {
    var data = {
        firstChoice: "",
        secondChoice: "",
        isRedistribute: true
    };
    var addsql = req.body;
    // var addsql = {
    //     stuID: '201706062629',
    //     type: 'regular'
    // };
    var sql0 = sqlMap.student.select_choice_regular_adjust;
    var $sql0 = sqlMap.student.select_choice_graduate_adjust;
    if (addsql.type == "regular") {
        query(sql0, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                data.err = "调剂参量查询错误"
                res.send(data);
            } else {
                data.isRedistribute = result[0].adjust;
                var sql1 = sqlMap.student.select_choice_regular_first;
                query(sql1, addsql.stuID, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "第一志愿查询错误"
                        res.send(data);
                    } else {
                        if (result[0]) {
                            data.firstChoice = result[0];
                            var sql2 = sqlMap.student.select_choice_regular_second;
                            query(sql2, addsql.stuID, function (err, result) {
                                if (err) {
                                    console.log("[SELECT ERROR]:", err.message);
                                    data.err = "第二志愿查询错误"
                                    res.send(data);
                                } else {
                                    if (result[0]) {
                                        data.secondChoice = result[0];
                                        res.send(data);
                                    } else {
                                        res.send(data);
                                    }
                                }
                            });
                        } else {
                            res.send(data);
                        }
                    }
                });
            }
        })
    } else if (addsql.type == "graduate") {
        query($sql0, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                data.err = "调剂参量查询错误"
                res.send(data);
            } else {
                data.isRedistribute = result[0].adjust;
                var $sql1 = sqlMap.student.select_choice_graduate_first;
                query($sql1, addsql.stuID, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        data.err = "第一志愿查询错误"
                        res.send(data);
                    } else {
                        if (result[0]) {
                            data.firstChoice = result[0];
                            var $sql2 = sqlMap.student.select_choice_graduate_second;
                            query($sql2, addsql.stuID, function (err, result) {
                                if (err) {
                                    console.log("[SELECT ERROR]:", err.message);
                                    data.err = "第二志愿查询错误"
                                    res.send(data);
                                } else {
                                    if (result[0]) {
                                        data.secondChoice = result[0];
                                        res.send(data);
                                    } else {
                                        res.send(data);
                                    }
                                }
                            });
                        } else {
                            res.send(data);
                        }
                    }
                });
            }
        })
    }
}

var tutorResult = function (req, res) {
    var addsql = req.body;
    // var addsql = {
    //     stuID: '201706062629',
    //     type: "regular"
    // };
    var data = {
        id: "",
        name: "",
        department: "",
        search: "",
        contact: ""
    };
    var sql1 = sqlMap.student.check_teacher_regular;
    var sql2 = sqlMap.student.check_teacher_graduate;
    if (addsql.type === "regular") {
        query(sql1, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERRO]:", err.message);
                res.send(data);
            } else {
                if (result[0]) {
                    data = result[0];
                    res.send(data);
                } else {
                    console.log(result);
                    res.send(data);
                }
            }
        });
    } else if (addsql.type === "graduate") {
        query(sql2, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERRO]:", err.message);
                res.send(data);
            } else {
                if (result[0]) {
                    data = result[0];
                    res.send(data);
                } else {
                    res.send(data);
                }
            }
        });
    }
};

var writeinfo = function (req, res) {
    var addsql = req.body;
    var data = {
        success: false
    };
    // var addsql = {
    //     stuID: 201706062629,
    //     tutorType: "regular",
    //     tableList: [{
    //         name: "profileTable",
    //         title: "学生个人简介表"
    //     }, {
    //         name: "choiceTable",
    //     }],
    //     profileTable: {
    //         flag: true,
    //         fileList: [{
    //             url: "abcabcabcabcabcabcabcabc",
    //             name: "caster.jpg",
    //             status: "success"
    //         }, {
    //             url: "http://localhost:8080/downloadFile?filename=saidgihkdglha&oldname=va11halla.png",
    //             name: "caster.jpg",
    //             status: "success",
    //             size: 1447144
    //         }]
    //     },
    //     choiceTable: {
    //         flag: true,
    //         fileList: [{
    //             url: "abcabcabcabcabcabcabcabc",
    //             name: "caster.jpg",
    //             "status": "success"
    //         }]
    //     }
    // }
    if (addsql.tutorType == "regular") {
        var sql1 = sqlMap.student.update_file_tableBody_regular;
        var tableBody1 = {};
        for (i = 0; i < systemset.tableList.length; i++) {
            tableBody1[systemset.tableList[i].name] =
                addsql[systemset.tableList[i].name];
        }
        console.log(tableBody1);
        query(sql1, [JSON.stringify(tableBody1), addsql.stuID], function (
            err,
            result
        ) {
            if (err) {
                console.log("[UPDATE ERRO]:", err.message);
                data.err = "服务器错误（上传文件详细信息）";
                res.send(data);
            } else {
                data.success = true;
                res.send(data);
            }
        });
    } else if (addsql.tutorType == "graduate") {
        var sql3 = sqlMap.student.update_file_tableBody_graduate;
        var tableBody2 = {};
        for (i = 0; i < systemset.tableList.length; i++) {
            tableBody2[systemset.tableList[i].name] =
                addsql[systemset.tableList[i].name];
        }
        query(sql3, [JSON.stringify(tableBody2), addsql.stuID], function (
            err,
            result
        ) {
            if (err) {
                console.log("[UPDATE ERRO]:", err.message);
                data.err = "服务器错误（上传文件详细信息）";
                res.send(data);
            } else {
                data.success = true;
                res.send(data);
            }
        });
    } else {
        data.err = "类型错误";
        res.send(data);
    }
};

var readinfo = function (req, res) {
    var addsql = req.body;
    // var addsql = {
    //     stuID: "201706062629",
    //     tutorType: "regular"
    // }
    var data = {
        tableList: systemset.tableList
    };
    if (addsql.tutorType == "regular") {
        var sql1 = sqlMap.student.select_file_tableBody_regular;
        query(sql1, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                data.err = "服务器错误";
                res.send(data);
            } else {
                if (result[0].tableBody) {
                    var body = JSON.parse(result[0].tableBody);
                    //for (i = 0; i < list0.length; i++) {
                    //}
                    for (i = 0; i < systemset.tableList.length; i++) {
                        data[systemset.tableList[i].name] =
                            body[systemset.tableList[i].name];
                    }
                }
                res.send(data);
            }
        });
    } else if (addsql.tutorType == "graduate") {
        var sql3 = sqlMap.student.select_file_tableBody_graduate;
        query(sql3, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                data.err = "服务器错误";
                res.send(data);
            } else {
                if (result[0].tableBody) {
                    var body = JSON.parse(result[0].tableBody);
                    //for (i = 0; i < list0.length; i++) {
                    //}
                    for (i = 0; i < list0.length; i++) {
                        data[systemset.tableList[i].name] =
                            body[systemset.tableList[i].name];
                    }
                }
                res.send(data);
            }
        });
    }
};

var baseInfo = function (req, res) {
    var addsql = req.body;
    // var addsql = {
    //     stuID: '201701010101'
    // }
    var data;
    var sql = sqlMap.student.select_mymessage;
    query(sql, addsql.stuID, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            data.err = "服务器错误";
            res.send(data);
        }
        data = result[0];
        res.send(data);
    });
};
var changeBaseInfo = function (req, res) {
    var addsql = req.body;
    // var addsql = {
    //     stuID: '201706062629',
    //     stuName: '张三',
    //     classes: 'class1',
    //     grade: '2017',
    //     contact: '123456'
    // }
    var data = {
        success: false
    };
    var sql = sqlMap.student.update_mymessage;
    query(
        sql,
        [
            addsql.stuName,
            addsql.classes,
            addsql.grade,
            addsql.contact,
            addsql.stuID
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
module.exports = {
    stulogin,
    changePass,
    allTeacher,
    selectedResult,
    tutorResult,
    chooseRegular,
    chooseGraduate,
    readinfo,
    writeinfo,
    baseInfo,
    changeBaseInfo
};
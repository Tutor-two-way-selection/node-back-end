var query = require('../util');
var sqlMap = require('../sqlMap');
var stulogin = function (req, res, next) {
    var sql = sqlMap.student.select_stunum;
    //var addsql = req.body;
    var $result = {
        success: 0,
        passChanged: 0,
    }
    var addsql = {
        stuID: '201706062629',
        stuPass: '1234',
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

var changePass = function (req, res, next) { //修改密码
    var sql = sqlMap.student.select_stunum;
    //var addsql = req.body;
    var addsql = {
        stuID: '201706062629',
        newPass: '1234',
    };
    var data = {
        success: false
    }
    query(sql, addsql.stuID, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            data.success = 0;
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
                            res.send(data);
                        } else {
                            data.success = true;
                            res.send(data);
                        }
                    });
                } else {
                    data.success = false;
                    res.send(data);
                }
            } else {
                data.success = false;
                res.send(data);
            }
        }
    });
};

var allTeacher = function (req, res, next) {
    var addsql = req.body;
    var data = {
        tutorList: ""
    }
    if (addsql.type) {
        if (addsql.type == "regular") {
            if (addsql.department) {
                var sql00 = sqlMap.student.select_department_regular;
                query(sql00, addsql.department, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
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
                    res.send(data);
                } else {
                    data.tutorList = result;
                    res.send(data);
                }
            });
        }


    }
};

var teacherById = function (req, res, next) {
    var sql = sqlMap.student.select_oneteacher;
    var addsql = req.body.teaNum;
    //var addsql = "1001"
    var str = "";
    query(sql, addsql, (err, result) => {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        }
        str = result;
        console.log(str);

        res.send(str);
    });
};

var chooseRegular = function (req, res, next) {
    var data = {
        success: false
    }
    //var addsql = req.body;
    var addsql = {
        stuID: "201706062629",
        firstChoice: "1001",
        secondChoice: "",
        isRedistribute: 0
    }
    var sql0 = sqlMap.student.update_teacher_regular_isRedistribute;
    var sql1 = sqlMap.student.update_teacher_regular_first;
    var sql2 = sqlMap.student.update_teacher_regular_second;
    query(sql0, [addsql.isRedistribute, addsql.stuID], (err, result) => {
        if (err) {
            console.log("[UPDATE ERRO]:", err.message);
            res.send(data);
        } else {
            console.log(1);
            if (addsql.firstChoice) {

                query(sql1, [addsql.firstChoice, addsql.stuID], (err, result) => {
                    if (err) {
                        console.log("[UPDATE ERRO]:", err.message);
                        res.send(data);
                    } else {
                        console.log(1);
                        if (addsql.secondChoice) {
                            query(sql2, [addsql.secondChoice, addsql.stuID], (err, result) => {
                                if (err) {
                                    console.log("[UPDATE ERRO]:", err.message);
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
    })
};

var chooseGraduate = function (req, res, next) {
    var data = {
        success: false
    }
    //var addsql = req.body;
    var addsql = {
        stuID: "201706062629",
        firstChoice: "1001",
        secondChoice: "",
        isRedistribute: 0
    }
    var sql0 = sqlMap.student.update_teacher_graduate_isRedistribute;
    var sql1 = sqlMap.student.update_teacher_graduate_first;
    var sql2 = sqlMap.student.update_teacher_graduate_second;
    query(sql0, [addsql.isRedistribute, addsql.stuID], function (err, result) {
        if (err) {
            console.log("[UPDATE ERRO]:", err.message);
            res.send(data);
        } else {
            console.log(1);
            if (addsql.firstChoice) {

                query(sql1, [addsql.firstChoice, addsql.stuID], function (err, result) {
                    if (err) {
                        console.log("[UPDATE ERRO]:", err.message);
                        res.send(data);
                    } else {
                        console.log(1);
                        if (addsql.secondChoice) {
                            query(sql2, [addsql.secondChoice, addsql.stuID], function (err, result) {
                                if (err) {
                                    console.log("[UPDATE ERRO]:", err.message);
                                    res.send(data);
                                } else {
                                    console.log(1);
                                    data.success = true;
                                    res.send(data);
                                }
                            })

                        } else {
                            data.success = true;
                            res.send(data);
                        }
                    }
                })
            } else {
                data.success = true;
                res.send(data);
            }
        }
    })
};

var selectedResult = function (req, res, next) {
    var data = {
        firstChoice: "",
        secondChoice: "",
        isRedistribute: true
    }
    var addsql = req.body;
    /*var addsql={
        stuID:'201706062629',
        type:'regular'
    };*/
    var sql0 = sqlMap.student.select_choice_regular_adjust;
    query(sql0, addsql.stuID, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            res.send(data);
        } else {
            data.isRedistribute = result[0];
            if (addsql.type == "regular") {
                var sql1 = sqlMap.student.select_choice_regular_first;
                query(sql1, addsql.stuID, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        res.send(data);
                    } else {
                        if (result[0]) {
                            data.firstChoice = result[0];
                            var sql2 = sqlMap.student.select_choice_regular_second;
                            query(sql2, addsql.stuID, function (err, result) {
                                if (err) {
                                    console.log("[SELECT ERROR]:", err.message);
                                    res.send(data);
                                } else {
                                    if (result[0]) {
                                        data.secondChoice = result[0];
                                        res.send(data);
                                    } else {
                                        res.send(data);
                                    }
                                }
                            })

                        } else {
                            res.send(data);
                        }
                    }
                })
            } else if (addsql.type == "graduate") {
                var $sql1 = sqlMap.student.select_choice_graduate_first;
                query($sql1, addsql.stuID, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        res.send(data);
                    } else {
                        if (result[0]) {
                            data.firstChoice = result[0];
                            var $sql2 = sqlMap.student.select_choice_graduate_second;
                            query($sql2, addsql.stuID, function (err, result) {
                                if (err) {
                                    console.log("[SELECT ERROR]:", err.message);
                                    res.send(data);
                                } else {
                                    if (result[0]) {
                                        data.secondChoice = result[0];
                                        res.send(data);
                                    } else {
                                        res.send(data);
                                    }
                                }
                            })

                        } else {
                            res.send(data);
                        }
                    }
                })

            }
        }
    });
};

var tutorResult = function (req, res, next) {
    //var addsql = req.body;
    var addsql = {
        stuID: '201706062629',
        type: "regular"
    };
    var str = "";
    var sql1 = sqlMap.student.check_teacher_regular;
    var sql2 = sqlMap.student.check_teacher_graduate;
    if (addsql.type == "regular") {
        query(sql1, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERRO]:", err.message);
                res.send(str);
            } else {

                if (result[0]) {

                    str = result[0];
                    res.send(str);
                } else {
                    res.send(str)
                }
            }
        });
    } else if (addsql.type == "graduate") {
        query(sql2, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERRO]:", err.message);
                res.send(str);
            } else {
                if (result[0]) {
                    str = result[0];
                    res.send(str);
                } else {
                    res.send(str)
                }
            }
        });
    }
};

var writeinfo = function (req, res, next) {
    //var addsql = req.body;
    var data = {
        success: false
    }
    var addsql = {
        stuID: 201706062629,
        tutorType: "regular",
        tableList: [{
            name: "profileTable",
            title: "学生个人简介表"
        }, {
            name: "choiceTable",
        }],
        profileTable: {
            flag: true,
            fileList: [{
                url: "abcabcabcabcabcabcabcabc",
                name: "caster.jpg",
                status: "success"
            }, {
                url: "http://localhost:8080/downloadFile?filename=saidgihkdglha&oldname=va11halla.png",
                name: "caster.jpg",
                status: "success",
                size: 1447144
            }]
        },
        choiceTable: {
            flag: true,
            fileList: [{
                url: "abcabcabcabcabcabcabcabc",
                name: "caster.jpg",
                "status": "success"
            }]
        }
    }
    if (addsql.tutorType == "regular") {
        var sql0 = sqlMap.student.update_file_tableList_regelar;
        var sql1 = sqlMap.student.update_file_tableBody_regelar;
        query(sql0, [JSON.stringify(addsql.tableList), addsql.stuID], function (err, result) {
            if (err) {
                console.log("[UPDATE ERRO]:", err.message);
                res.send(data);
            } else {
                var tableBody1 = {};

                for (i = 0; i < addsql.tableList.length; i++) {
                    tableBody1[addsql.tableList[i].name] = addsql[addsql.tableList[i].name]
                }
                console.log(tableBody1);


                query(sql1, [JSON.stringify(tableBody1), addsql.stuID], function (err, result) {
                    if (err) {
                        console.log("[UPDATE ERRO]:", err.message);
                        res.send(data);
                    } else {
                        data.success = true;
                        res.send(data);
                    }
                })
            }
        })
    } else if (addsql.tutorType == "graduate") {
        var sql2 = sqlMap.student.update_file_tableList_graduate;
        var sql3 = sqlMap.student.update_file_tableBody_graduate;
        query(sql2, [addsql.tableList, addsql.stuID], function (err, result) {
            if (err) {
                console.log("[UPDATE ERRO]:", err.message);
                res.send(data);
            } else {
                var tableBody2 = {};
                for (i = 0; i < addsql.tableList.length; i++) {
                    tableBody2[addsql.tableList[i].name] = addsql[addsql.tableList[i].name]
                }
                query(sql3, [JSON.stringify(tableBody2), addsql.stuID], function (err, result) {
                    if (err) {
                        console.log("[UPDATE ERRO]:", err.message);
                        res.send(data);
                    } else {
                        data.success = true;
                        res.send(data);
                    }
                })
            }
        })
    } else {
        res.send(data);
    }
}

var readinfo = function (req, res, next) {

    //var addsql = req.body;
    var addsql = {
        stuID: "201706062629",
        tutorType: "regular"
    }
    var data = {
        tableList: ""
    }
    if (addsql.tutorType == "regular") {
        var sql0 = sqlMap.student.select_file_tableList_regelar;
        var sql1 = sqlMap.student.select_file_tableBody_regelar;
        query(sql0, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                res.send(data);
            } else {
                data.tableList = JSON.parse(result[0].tableList);
                var list0 = JSON.parse(result[0].tableList)
                query(sql1, addsql.stuID, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        res.send(data);
                    } else {
                        var body = JSON.parse(result[0].tableBody)
                        //for (i = 0; i < list0.length; i++) {
                        //}
                        for (i = 0; i < list0.length; i++) {
                            data[list0[i].name] = body[list0[i].name]
                        }
                        res.send(data);
                    }
                })
            }
        })
    } else if (addsql.tutorType == "graduate") {

        var sql2 = sqlMap.student.select_file_tableList_graduate;
        var sql3 = sqlMap.student.select_file_tableBody_graduate;
        query(sql2, addsql.stuID, function (err, result) {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                res.send(data);
            } else {
                data.tableList = JSON.parse(result[0].tableList);
                var list0 = JSON.parse(result[0].tableList)
                query(sql3, addsql.stuID, function (err, result) {
                    if (err) {
                        console.log("[SELECT ERROR]:", err.message);
                        res.send(data);
                    } else {
                        var body = JSON.parse(result[0].tableBody)
                        //for (i = 0; i < list0.length; i++) {
                        //}
                        for (i = 0; i < list0.length; i++) {
                            data[list0[i].name] = body[list0[i].name]
                        }
                        res.send(data);
                    }
                })
            }
        })






    }
}

module.exports = {
    stulogin,
    changePass,
    teacherById,
    allTeacher,
    selectedResult,
    tutorResult,
    chooseRegular,
    chooseGraduate,
    readinfo,
    writeinfo,

}
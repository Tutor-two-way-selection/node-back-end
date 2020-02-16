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
var stuinfo=function(req,res,next){
    //var addsql=req.body;
    var addsql={
        teaID:'1001',
        type:'regular',
        batch:1,
    }
    var data={
        tableList:"",
        stuList:""
    }
    if(addsql.type==="regular"){
        var rsql=sqlMap.teacher.select_tablelist_regular;
        query(rsql,function(err,ret){
            if(err){
                console.log('[SELECT ERRO]:',err.message);
                res.send(data);
            }else{
                data.tableList=ret[0];
            }
        })
        if(batch==1){
            var sql=sqlMap.teacher.select_stu_first_regular;
            query(sql,addsql.teaID,function(err,result){
                if(err){
                    console.log('[SELECT ERRO]:',err.message);
                    res.send(data);
                }else{
                    data.stuList=result;
                    res.send(data);
                }
            })
        }else{
            var sql0=sqlMap.teacher.select_stu_second_regular;
            query(sql0,addsql.teaID,function(err,result){
                if(err){
                    console.log('[SELECT ERRO]:',err.message);
                    res.send(data);
                }else{
                    data.stuList=result;
                    res.send(data);
                }
            })

        }
    }else{
        var gsql=sqlMap.teacher.select_tablelist_graduate;
        query(gsql,function(err,ret){
            if(err){
                console.log('[SELECT ERRO]:',err.message);
                res.send(data);
            }else{
                data.tableList=ret[0];
            }
        })
        if(batch==1){
            var sql1=sqlMap.teacher.select_stu_first_graduate;
            query(sql1,addsql.teaID,function(err,result){
                if(err){
                    console.log('[SELECT ERRO]:',err.message);
                    res.send(data);
                }else{
                    data.stuList=result;
                    res.send(data);
                }
            })
        }else{
            var sql2=sqlMap.teacher.select_stu_second_graduate;
            query(sql0,addsql.teaID,function(err,result){
                if(err){
                    console.log('[SELECT ERRO]:',err.message);
                    res.send(data);
                }else{
                    data.stuList=result;
                    res.send(data);
                }
            })

        }
    }
    
}
var selectstu=function(req,res,next){
    //var addsql=req.body;
    var addsql={
        teaID: "1001",
        type:"regular",
        selStuList:[{
            stuID:"201701010101",
            recept:true
        },{
            stuID:"201701010102",
            recept:false
        }]
    }
    var data={
        success:true
    }
    //先查询这个老师是第一志愿还是第二志愿老师
    var rsql1=sqlMap.teacher.select_teafirst_regular;
    var rsql2=sqlMap.teacher.select_teasecond_regular;

    var gsql1=sqlMap.teacher.select_teafirst_graduate;
    var gsql2=sqlMap.teacher.select_teasecond_graduate;
    //如果是第一志愿则修改第一志愿
    var rsql11=sqlMap.teacher.receive_first_regular;
    var rsql10=sqlMap.teacher.refuse_first_regular;
    var rsql21=sqlMap.teacher.receive_second_regular;
    var rsql20=sqlMap.teacher.refuse_second_regular;

    var gsql11=sqlMap.teacher.receive_first_graduate;
    var gsql10=sqlMap.teacher.refuse_first_graduate;
    var gsql21=sqlMap.teacher.receive_second_graduate;
    var gsql20=sqlMap.teacher.refuse_second_graduate;
    

    if(addsql.type==="regular"){
        for(var i=0;i<addsql.selStuList.length;i++){    
            var ifRecept=addsql.selStuList[i].recept;
            var stuNum=addsql.selStuList[i].stuID;   
            query(rsql1,addsql.teaID,function(err,result){
                if(err){
                    console.log('[SELECT ERRO]:',err.message);
                    data.success=false;
                    res.send(data);
                }
                else{
                    //如果在第一志愿找不到那么找第二志愿
                    if(result[0]===undefined){
                        query(rsql2,addsql.teaID,function(err,result){
                            if(err){
                                console.log('[SELECT ERRO]:',err.message);
                                data.success=false;
                                res.send(data);
                            }else{
                                if(ifRecept==true){
                                    query(rsql21,stuNum,function(err,ret){
                                        if(err){
                                            console.log('[UPDATE ERRO]:',err.message);
                                            data.success=false;
                                            res.send(data);
                                        }
                                    })
                                }else{
                                    query(rsql20,stuNum,function(err,ret){
                                        if(err){
                                            console.log('[UPDATE ERRO]:',err.message);
                                            data.success=false;
                                            res.send(data);
                                        }
                                    })
                                }
                            }
                        })
                    }else{
                        if(ifRecept==true){
                            query(rsql11,stuNum,function(err,ret){
                                if(err){
                                    console.log('[UPDATE ERRO]:',err.message);
                                    data.success=false;
                                    res.send(data);
                                }
                            })
                        }else{
                            query(rsql10,stuNum,function(err,ret){
                                if(err){
                                    console.log('[UPDATE ERRO]:',err.message);
                                    data.success=false;
                                    res.send(data);
                                }
                            })
                        }
                    }
                }
            })
        }
        res.send(data);
    }else{
        for(var i=0;i<addsql.selStuList.length;i++){    
            var ifRecept=addsql.selStuList[i].recept;
            var stuNum=addsql.selStuList[i].stuID;   
            query(gsql1,addsql.teaID,function(err,result){
                if(err){
                    console.log('[SELECT ERRO]:',err.message);
                    data.success=false;
                    res.send(data);
                }
                else{
                    //如果在第一志愿找不到那么找第二志愿
                    if(result[0]===undefined){
                        query(gsql2,addsql.teaID,function(err,result){
                            if(err){
                                console.log('[SELECT ERRO]:',err.message);
                                data.success=false;
                                res.send(data);
                            }else{
                                if(ifRecept==true){
                                    query(gsql21,stuNum,function(err,ret){
                                        if(err){
                                            console.log('[UPDATE ERRO]:',err.message);
                                            data.success=false;
                                            res.send(data);
                                        }
                                    })
                                }else{
                                    query(gsql20,stuNum,function(err,ret){
                                        if(err){
                                            console.log('[UPDATE ERRO]:',err.message);
                                            data.success=false;
                                            res.send(data);
                                        }
                                    })
                                }
                            }
                        })
                    }else{
                        if(ifRecept==true){
                            query(gsql11,stuNum,function(err,ret){
                                if(err){
                                    console.log('[UPDATE ERRO]:',err.message);
                                    data.success=false;
                                    res.send(data);
                                }
                            })
                        }else{
                            query(gsql10,stuNum,function(err,ret){
                                if(err){
                                    console.log('[UPDATE ERRO]:',err.message);
                                    data.success=false;
                                    res.send(data);
                                }
                            })
                        }
                    }
                }
            })
        }
        res.send(data);
    }


}
var accepted=function(req,res,next){
    //var addsql=req.body;
    var addsql={
        teaID: "1001",
        type: "regular"
    }
    var data={
        tableList:"",
        stuList:""
    }
    if(addsql.type==="regular"){
        var rsql=sqlMap.teacher.select_tablelist_regular;
        query(rsql,function(err,ret){
            if(err){
                console.log('[SELECT ERRO]:',err.message);
                res.send(data);
            }else{
                data.tableList=ret[0];
            }
        })
        var sql=sqlMap.teacher.select_result_regular;
        query(sql,addsql.teaID,function(err,result){
            if(err){
                console.log('[SELECT ERRO]:',err.message);
                res.send(data);
            }else{
                data.stuList=result;
                res.send(data);
            }
        })

    }else{
        var gsql=sqlMap.teacher.select_tablelist_graduate;
        query(gsql,function(err,ret){
            if(err){
                console.log('[SELECT ERRO]:',err.message);
                res.send(data);
            }else{
                data.tableList=ret[0];
            }
        })
        var sql0=sqlMap.teacher.select_result_graduate;
        query(sql0,addsql.teaID,function(err,result){
            if(err){
                console.log('[SELECT ERRO]:',err.message);
                res.send(data);
            }else{
                data.stuList=result;
                res.send(data);
            }
        })

    }

}
module.exports = {
    login,
    info,
    changeinfo,
    stuinfo,
    selectstu,
    accepted,

}
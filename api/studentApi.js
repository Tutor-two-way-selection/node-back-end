var query = require('../util')
var sqlMap = require('../sqlMap');
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
var stulogin=function(req,res,next){
    var sql=sqlMap.student.select_stunum;
    var addsql=req.body;
    var $result={
         success:0,
         passChanged:0,
    }
    /*var addsql={
        stuNum:'201706062629',
        stuPass:'1234',
    };*/
    query(sql, addsql.stuNum, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        }
        if(result[0]===undefined){
            console.log("查询不出username");//查询不出username
        }else{
            //登录成功
            var resultArray = result[0];
            if(resultArray.stuPass == addsql.stuPass) {
                var restr={
                    success:1,
                    passChanged:resultArray.passChanged
                };
                console.log(1);
                res.send(restr);
            }
            else{
                console.log(2);
                res.send($result);
            } 
        }

    });
}
var changePass=function(req,res,next){
    var sql=sqlMap.student.select_stunum;
    var addsql=req.body;
   /*var addsql={
    stuNum:'201706062629',
    newPass:'1234',
    };*/
    var success=false;
    query(sql, addsql.stuNum, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        }
        if(result.length===0){
            console.log("查询不出username");//查询不出username
        }else{

            //登录成功
            var resultArray = result[0];
            console.log(resultArray);
            if(resultArray.stuPass !== addsql.newPass) {
                var $sql=sqlMap.student.update_pass;
                query($sql,[addsql.newPass,addsql.stuNum],function(err,result){
                    if (err) {
                        console.log("[UPDATE ERROR]:", err.message);
                    }else{
                        success=true;
                     
                        console.log(success);
                        res.send(success);
                    }
                });
            }
            else{
                res.send(false);
            }
        }
          //username
    });

}
var selfInfo = function (req, res, next) {
    var sql = sqlMap.student.select_num;
    var addsql=req.body.stuNum;
    //var addsql = "201706062629"
    var str = "";
    query(sql, addsql, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        }
        str = result;
        console.log(str);

        res.send(str);
    });
}

var allTeacher = function (req, res, next) {
    var sql = sqlMap.student.select_allteacher;
    var str = "";
    query(sql, null, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        }
        str = result;
        console.log(str);
        res.send(str);
    });
}

var teacherById = function (req, res, next) {
    var sql = sqlMap.student.select_oneteacher;
    var addsql = req.body.teaNum
    //var addsql = "1001"
    var str = "";
    query(sql, addsql, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        }
        str = result;
        console.log(str);

        res.send(str);
    });
}

var teacherByDepartment = function (req, res, next) {
    var sql = sqlMap.student.select_department;
    var addsql = req.body.teaDepart
    //var addsql = "数字媒体技术"
    var str = "";
    query(sql, addsql, function (err, result) {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
        }
        str = result;
        console.log(str);
        res.send(str);
    });
}



var regularTeaSlected=function(req,res,next){
    var sql=sqlMap.student.select_teacher;
    var addsql=req.body;
   /*  var addsql={
        stuID:'201706062629',
        firstChoice:'1001',
        secondChoice:'1002',
        isRedistribute:true,
    }*/
    query(sql,[addsql.firstChoice,addsql.secondChoice,addsql.isRedistribute,addsql.stuID],function(err,result){
        var data={
            success:0
        };
        if(err){
            console.log("[UPDATE ERRO]:",err.message);
        }
        if(result.affectedRows === undefined){
            console.log("更新失败");
            res.send(data);
        }else{
            data.success=1;
            console.log(data);
            res.send(data);
        }  
    });
}
var selectedResult=function(req,res,next){
    var sql=sqlMap.student.select_choice;
    var addsql=req.body;
    /*var addsql={
        stuID:'201706062629',
        type:'regular'
    };*/
    query(sql,[addsql.stuID,addsql.stuID],function(err,result){
        if(err){
            console.log("[SELECT ERRO]:",err.message);
        }
        //var $result;
       var $result={
            firstChoice:{
                id:'',
                name:'',
                department:'',
                search:'',
                contact:''
            },
            secondChoice:{
                id:'',
                name:'',
                department:'',
                search:'',
                contact:''
            },
            isRedistribute:0
        };
        
        if(result[0]===undefined){
            console.log("查找失败");
            res.send(result);
        }else{
            $result.firstChoice=result[0];
            if(result.length==2){
                $result.secondChoice=result[1];
            }
            var  sql2=sqlMap.student.select_adjust;
            query(sql2,addsql.stuID,function(err,ret){
                if(err){
                    console.log("[SELECT ERRO]:",err.message);
                }
                $result.isRedistribute=ret[0].adjust;//ret[0]
                res.send($result);
            });    
        }
    });
}
var tutorResult=function(req,res,next){
    var sql=sqlMap.student.check_teacher;
    var addsql=req.body;
    /*var addsql={
        stuID:'201706062629',
        type:'regular'
    };*/
    var str = "";
    query(sql,addsql.stuID,function(err,result){
        if(err){
            console.log("[SELECT ERRO]:",err.message);
        }
        str = result;
        console.log(str);
        res.send(str);
    });
}

module.exports = {
    stulogin,
    changePass,
    teacherByDepartment,
    teacherById,
    selfInfo,
    allTeacher,
    regularTeaSlected,
    selectedResult,
    tutorResult
}
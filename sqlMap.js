// sql语句
var sqlMap = {
    // 学生
    student: {
        //登录
        select_stunum:'select * from stuaccount where stuNum = ?',
        select_num: 'select * from student where stuNum = ?',    //查询 stuNum
        //修改密码
        update_pass:"update stuaccount set stuPass=?  ,passChanged=1 where stuNum=?",
        //修改个人信息...
        update:'update student set',
        //查看自己的信息
        select_onestu:'select * from student where stuNum = ?',
        //查看所有导师的信息
        select_allteacher:'select * from teacher',
        //查看某个导师
        select_oneteacher:'select * from teacher where id = ?',
        //按部门
        select_department:'select * from teacher where department = ?',
        //按研究所
        select_search:'select * from teacher where search = ?',
        //已选择的导师
        select_choice:'select * from teacher where id in (select id from choice where stuNum=?)',
        //第一/二志愿选择
        select_teacher:"update choice set id = ? and priority =? and status='待确认' where stuNum =?",
        //如果选择志愿的时候之前已填过则产生冲突
        select_erro:'select * from choice where priority =? and stuNum =?',
        //退选
        exit_teacher:'update choice set priority=NULL and id=NULL where stuNum =? and id=?',
        //查看自己的导师
        check_teacher:'select * from choice where id in(select id from result where stuNum=?)',
    },
    //导师
    teacher: {






    },
    //管理员
    admin: {
        
    }

}
 
module.exports = sqlMap;
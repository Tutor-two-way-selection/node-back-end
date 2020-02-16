// sql语句
var sqlMap = {
    // 学生
    student: {
        //登录
        select_stunum: 'select * from stuaccount where stuNum = ?',
        select_num: 'select * from student where stuNum = ?', //查询 stuNum
        //修改密码
        update_pass: "update stuaccount set stuPass=?  ,passChanged=1 where stuNum=?",
        //修改个人信息...
        update: 'update student set',
        //查看自己的信息
        select_onestu: 'select * from student where stuNum = ?',
        //查看所有导师的信息
        select_allteacher: 'select * from teacher',
        //查看所有毕业导师的信息
        select_allGraduateTeacher: 'select * from teacher where isgraduate = 1',
        //查看所有本科导师的信息
        select_allRegularTeacher: 'select * from teacher where isregular = 1',
        //查看某个导师
        select_oneteacher: 'select * from teacher where id = ?',


        //所有导师按部门
        select_department: 'select * from teacher where department = ?',
        //毕业导师按部门
        select_department_graduate: 'select * from teacher where department = ? and isgraduate = 1',
        //毕业导师按研究方向
        select_search_graduate: 'select * from teacher where search = ? and isgraduate = 1',

        //本科导师按部门
        select_department_regular: 'select * from teacher where department = ? and isregular = 1',
        //本科导师按研究方向
        select_search_regular: 'select * from teacher where search = ? and isregular = 1',

        //已选择的本科导师
        select_choice_regular_adjust: 'select adjust from regularchoice where stuNum=?',
        select_choice_regular_first: 'select * from teacher where id in (select idFirst from regularchoice where stuNum=?)',
        select_choice_regular_second: 'select * from teacher where id in (select idSecond from regularchoice where stuNum=?)',

        //已选择的毕业导师
        select_choice_graduate_adjust: 'select adjust from graduatechoice where stuNum=?',
        select_choice_graduate_first: 'select * from teacher where id in (select idFirst from graduatechoice where stuNum=?)',
        select_choice_graduate_second: 'select * from teacher where id in (select idSecond from graduatechoice where stuNum=?)',


        //本科导师选择
        update_teacher_regular_first: "update regularchoice set idFirst = ?,statusFirst='待确认' where stuNum =?",
        update_teacher_regular_second: "update regularchoice set idSecond = ?,statusSecond='待确认' where stuNum =?",
        update_teacher_regular_isRedistribute: "update regularchoice set adjust =? where stuNum =?",



        //毕业导师选择
        update_teacher_graduate_first: "update graduatechoice set idFirst = ? ,statusFirst='待确认' where stuNum =?",
        update_teacher_graduate_second: "update graduatechoice set idSecond = ?,statusSecond='待确认' where stuNum =?",
        update_teacher_graduate_isRedistribute: 'update graduatechoice set adjust =? where stuNum =?',

        //查看自己的导师
        check_teacher_graduate: 'select * from teacher where id in(select graduateid from result where stuNum=?)',
        check_teacher_regular: 'select * from teacher where id in(select regularid from result where stuNum=?)',


        //本科文件
        update_file_tableList_regelar: 'update regularchoice set tableList =? where stuNum=?',
        update_file_tableBody_regelar: 'update regularchoice set tableBody =? where stuNum=?',
        select_file_tableList_regelar: 'select tableList from regularchoice where stuNum=?',
        select_file_tableBody_regelar: 'select tableBody from regularchoice where stuNum=?',



        //毕业文件
        update_file_tableList_graduate: 'update graduatechoice set tableList =? where stuNum=?',
        update_file_tableBody_graduate: 'update graduatechoice set tableBody =? where stuNum=?',

        select_file_tableList_graduate: 'select tableList from graduatechoice where stuNum=?',
        select_file_tableBody_graduate: 'select tableBody from graduatechoice where stuNum=?',
    },
    //导师
    teacher: {
        select_teacheracount: 'select * from teaaccount where id = ?',
        update_teacher_selfinfo: 'update teacher set name=?,department=?,search=?,contact=? where id=?',
        //老师-志愿关系
        select_teafirst_regular:'select * from regularchoice where stuNum=? and idFirst=?',
        select_teasecond_regular:'select * from regularchoice where stuNum=? and idSecond=?',
        select_teafirst_graduate:'select * from graduatechoice where stuNum=? and idFirst=?',
        select_teasecond_graduate:'select * from graduatechoice where stuNum=? and idSecond=?',
        //查询？志愿学生信息
        select_stu_first_regular:'select regularchoice.stuNum,stuName,tableBody from regularchoice,student where idFirst=? and regularchoice.stuNum=student.stuNum',
        select_stu_second_regular:'select regularchoice.stuNum,stuName,tableBody  from regularchoice,student where idSecond=? and regularchoice.stuNum=student.stuNum',
        select_stu_first_graduate:'select graduatechoice.stuNum,stuName,tableBody from graduatechoice,student where idFirst=? and graduatechoice.stuNum=student.stuNum',
        select_stu_second_graduate:'select graduatechoice.stuNum,stuName,tableBody from graduatechoice,student where idSecond=? and graduatechoice.stuNum=student.stuNum',
        select_tablelist_regular:'select tableList from regularchoice',
        select_tablelist_graduate:'select tableList from graduatechoice',
        //拒收或者接收
        receive_first_regular:'update regularchoice set statusFirst="接收" where  stuNum=?',
        receive_second_regular:'update regularchoice set statusSecond="接收" where  stuNum=?',
        refuse_first_regular:'update regularchoice set statusFirst="不接收" where  stuNum=?',
        refuse_second_regular:'update regularchoice set statusSecond="不接收" where  stuNum=?',
        receive_first_graduate:'update graduatechoice set statusFirst="接收" where  stuNum=?',
        receive_second_graduate:'update graduatechoice set statusSecond="接收" where  stuNum=?',
        refuse_first_graduate:'update graduatechoice set statusFirst="不接收" where  stuNum=?',
        refuse_second_graduate:'update graduatechoice set statusSecond="不接收" where  stuNum=?',

        //管理员确认后查看学生信息
        select_result_regular:'select stuName,regularchoice.stuNum,tableBody from regularchoice,student where regularchoice.stuNum=student.stuNum and regularchoice.stuNum in (select stuNum from result where regularid=?)',
        select_result_graduate:'select stuName,graduatechoice.stuNum,tableBody from graduatechoice,student where graduatechoice.stuNum=student.stuNum and graduatechoice.stuNum in (select stuNum from result where graduateid=?)'
        //select_result_regular:'select stuNum from result where regularid=?'









    },
    //管理员
    admin: {

    }

}

module.exports = sqlMap;
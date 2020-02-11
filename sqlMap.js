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
        //毕业导师按部门
        select_department_graduate: 'select * from teacher where department = ? and isgraduate = 1',
        //毕业导师按研究所
        select_search_graduate: 'select * from teacher where search = ? and isgraduate = 1',

        //本科导师按部门
        select_department_regular: 'select * from teacher where department = ? and isregular = 1',
        //本科导师按研究所
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

    },
    //导师
    teacher: {






    },
    //管理员
    admin: {

    }

}

module.exports = sqlMap;
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
        update_teacher_regular_first: "update regularchoice set idFirst = ?,statusFirst='untreat' where stuNum =?",
        update_teacher_regular_second: "update regularchoice set idSecond = ?,statusSecond='untreat' where stuNum =?",
        update_teacher_regular_isRedistribute: "update regularchoice set adjust =? where stuNum =?",



        //毕业导师选择
        update_teacher_graduate_first: "update graduatechoice set idFirst = ? ,statusFirst='untreat' where stuNum =?",
        update_teacher_graduate_second: "update graduatechoice set idSecond = ?,statusSecond='untreat' where stuNum =?",
        update_teacher_graduate_isRedistribute: 'update graduatechoice set adjust =? where stuNum =?',

        //查看自己的导师
        check_teacher_graduate: 'select * from teacher where id in(select graduateid from result where stuNum=?)',
        check_teacher_regular: 'select * from teacher where id in(select regularid from result where stuNum=?)',


        //本科文件
        update_file_tableList_regular: 'update regularchoice set tableList =? where stuNum=?',
        update_file_tableBody_regular: 'update regularchoice set tableBody =? where stuNum=?',
        select_file_tableList_regular: 'select tableList from regularchoice where stuNum=?',
        select_file_tableBody_regular: 'select tableBody from regularchoice where stuNum=?',



        //毕业文件
        update_file_tableList_graduate: 'update graduatechoice set tableList =? where stuNum=?',
        update_file_tableBody_graduate: 'update graduatechoice set tableBody =? where stuNum=?',

        select_file_tableList_graduate: 'select tableList from graduatechoice where stuNum=?',
        select_file_tableBody_graduate: 'select tableBody from graduatechoice where stuNum=?',
    },
    //导师
    teacher: {
        select_teacher_graduate_num: "select graduatenum from teacher where id =?",
        select_teacher_regular_num: "select regularnum from teacher where id =?",

        update_teacher_graduate_num: "update teacher set graduatenum = ? where id =?",
        update_teacher_regular_num: "update teacher set regularnum =? where id =?",

        select_teacheracount: 'select * from teaaccount where id = ?',
        update_teacher_selfinfo: 'update teacher set name=?,department=?,search=?,contact=? where id=?',
        //老师-志愿关系
        select_teafirst_regular: 'select * from regularchoice where stuNum=? and idFirst=?',
        select_teasecond_regular: 'select * from regularchoice where stuNum=? and idSecond=?',
        select_teafirst_graduate: 'select * from graduatechoice where stuNum=? and idFirst=?',
        select_teasecond_graduate: 'select * from graduatechoice where stuNum=? and idSecond=?',
        //查询？志愿学生信息
        select_stu_first_regular: "select regularchoice.stuNum,stuName from regularchoice,student where idFirst=? and statusFirst='untreat' and stuGrade=? and regularchoice.stuNum=student.stuNum",
        select_stu_second_regular: "select regularchoice.stuNum,stuName from regularchoice,student where idSecond=? and statusFirst='refuse' and stuGrade=?  and regularchoice.stuNum=student.stuNum",
        select_stu_first_graduate: "select graduatechoice.stuNum,stuName, from graduatechoice,student where idFirst=? and statusFirst='untreat' and stuGrade=? and graduatechoice.stuNum=student.stuNum",
        select_stu_second_graduate: "select graduatechoice.stuNum,stuName, from graduatechoice,student where idSecond=? and statusFirst='refuse' and stuGrade=? and graduatechoice.stuNum=student.stuNum",

        //拒收或者接收
        receive_first_regular: "update regularchoice set statusFirst='accept' where  stuNum=?",
        receive_second_regular: "update regularchoice set statusSecond='accept' where  stuNum=?",
        refuse_first_regular: "update regularchoice set statusFirst='refuse' where  stuNum=?",
        refuse_second_regular: "update regularchoice set statusSecond='refuse' where  stuNum=?",
        receive_first_graduate: "update graduatechoice set statusFirst='accept' where  stuNum=?",
        receive_second_graduate: "update graduatechoice set statusSecond='accept' where  stuNum=?",
        refuse_first_graduate: "update graduatechoice set statusFirst='refuse' where  stuNum=?",
        refuse_second_graduate: "update graduatechoice set statusSecond='refuse' where  stuNum=?",

        //管理员确认后查看学生信息
        select_result_regular: 'select stuName,regularchoice.stuNum from regularchoice,student where regularchoice.stuNum=student.stuNum and regularchoice.stuNum in (select stuNum from result where regularid=?)',
        select_result_graduate: 'select stuName,graduatechoice.stuNum from graduatechoice,student where graduatechoice.stuNum=student.stuNum and graduatechoice.stuNum in (select stuNum from result where graduateid=?)'
        //select_result_regular:'select stuNum from result where regularid=?'









    },
    //管理员
    admin: {
        //登录
        login: 'select * from admin where adminNum = ?',
        stulist: 'select * from student where stuGrade in(select adminGrade from admin where adminNum = ?)',
        //如果第一志愿被录取则填进result表里&&手动调整
        update_result_regularid: 'update result set regularid=? where stuNum =?',
        update_result_graduateid: 'update result set graduateid=? where stuNum =?',

        //第一轮与第二轮
        select_first_regular: 'select student.stuNum,stuName,stuClass,teacher.id teaID,teacher.name,statusFirst status from student ,teacher,regularchoice where student.stuNum=regularchoice.stuNum and teacher.id=regularchoice.idFirst and stuGrade in(select adminGrade from admin where adminNum = ?)',
        select_second_regular: "select student.stuNum,stuName,stuClass,teacher.id teaID,teacher.name,statusSecond status from student ,teacher,regularchoice where statusFirst !='accept',student.stuNum=regularchoice.stuNum and teacher.id=regularchoice.idSecond  and stuGrade in(select adminGrade from admin where adminNum = ?) ",
        select_first_graduate: 'select student.stuNum,stuName,stuClass,teacher.id teaID,teacher.name,statusFirst status from student ,teacher,graduatechoice where student.stuNum=graduatechoice.stuNum and teacher.id=graduatechoice.idFirst and stuGrade in(select adminGrade from admin where adminNum = ?)',
        select_second_graduate: "select student.stuNum,stuName,stuClass,teacher.id teaID,teacher.name,statusSecond status from student ,teacher,graduatechoice where statusFirst !='accept',student.stuNum=graduatechoice.stuNum and teacher.id=graduatechoice.idSecond and stuGrade in(select adminGrade from admin where adminNum = ?)",

        //未分配的学生
        select_resultnull_regularid: "SELECT student.stuNum,stuName,stuClass from result,student,regularchoice where regularid is NULL and student.stuNum=regularchoice.stuNum and adjust='refuse' and result.stuNum=student.stuNum and stuGrade in(select adminGrade from admin where adminNum =?)",
        select_resultnull_graduateid: "SELECT student.stuNum,stuName,stuClass from result,student,graduatechoice where graduateid is NULL and student.stuNum=graduatechoice.stuNum and adjust='refuse' and result.stuNum=student.stuNum and stuGrade in(select adminGrade from admin where adminNum =?) ",

        //是否全部分配
        select_resultall_regularid: "select result.stuNum from result,student where result.stuNum in(select stuNum from regularchoice where adjust=1) and regularid is NULL and stuGrade in(select adminGrade from admin where adminNum =?) and result.stuNum=student.stuNum",
        select_resultall_graduateid: "select result.stuNum from result,student where result.stuNum in(select stuNum from graduatechoice where adjust=1) and graduateid is NULL and stuGrade in(select adminGrade from admin where adminNum =?) and result.stuNum=student.stuNum",
        //志愿全被处理
        first_success_regular: "select student.stuNum from regularchoice ,student where statusFirst='untreat' and stuGrade in(select adminGrade from admin where adminNum =?)and student.stuNum=regularchoice.stuNum ",
        second_success_regular: "select student.stuNum from regularchoice ,student where statusSecond='untreat' and stuGrade in(select adminGrade from admin where adminNum =?)and student.stuNum=regularchoice.stuNum",
        first_success_graduate: "select student.stuNum from graduatechoice ,student where statusFirst='untreat' and stuGrade in(select adminGrade from admin where adminNum =?)and student.stuNum=graduatechoice.stuNum",
        second_success_graduate: "select student.stuNum from graduatechoice ,student where statusSecond='untreat' and stuGrade in(select adminGrade from admin where adminNum =?)and student.stuNum=graduatechoice.stuNum",

        //查询batch
        select_batch_regular: 'select rbatch from admin where adminNum=?',
        select_batch_graduate: 'select gbatch from admin where adminNum=?',

        //修改batch
        update_batch_regular: 'update admin set rbatch=? where adminNum=?',
        update_batch_graduate: 'update admin set gbatch=? where adminNum=?',

        //增加公示时间
        update_time_regular: 'update admin set rpstart=? ,rpend=? where adminNum=?',
        update_time_graduate: 'update admin set gpstart=? ,gpend=? where adminNum=?',

        //查询公示时间
        select_time_regular: 'select rpstart,rpend from admin where adminNum=?',
        select_time_graduate: 'select gpstart,gpend from admin where adminNum=?',

        //最后的结果
        select_final_graduate: 'select stuName,student.stuNum,stuClass,stuTelephone,`name`,id from student,teacher,result where student.stuNum=result.stuNum and teacher.id=result.graduateid and stuGrade in(select adminGrade from admin where adminNum =?)',
        select_final_regular: 'select stuName,student.stuNum,stuClass,stuTelephone,`name`,id from student,teacher,result where student.stuNum=result.stuNum and teacher.id=result.regularid and stuGrade in(select adminGrade from admin where adminNum =?)',





    }

}

module.exports = sqlMap;
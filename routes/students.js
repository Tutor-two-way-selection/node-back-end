var express = require("express");
var router = express.Router();
var studentservices = require("../api/studentApi");
var fs=require("fs")
var multer = require('multer');//引入multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  }
})

var upload = multer({dest: 'uploads/'});//设置上传文件存储地址
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/login",studentservices.stulogin)
router.get("/changePass",studentservices.changePass)
router.get("/selfinfo", studentservices.selfInfo)
router.get("/allteacher",studentservices.allTeacher )
router.get("/teacherbyid",studentservices.teacherById )
router.get("/teacherbydepartment",studentservices.teacherByDepartment)





module.exports = router;
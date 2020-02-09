var express = require("express");
var router = express.Router();
var studentservices = require("../api/studentApi");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/login",studentservices.stulogin)
router.get("/changePass",studentservices.changePass)
router.get("/selfinfo", studentservices.selfInfo)
router.get("/allteacher",studentservices.allTeacher )
router.get("/teacherbyid",studentservices.teacherById )
router.get("/teacherbydepartment",studentservices.teacherByDepartment)
router.get("/regular",studentservices.regularTeaSlected)
router.get("/mytutor",studentservices.tutorResult)
router.get("/selected",studentservices.selectedResult);



module.exports = router;
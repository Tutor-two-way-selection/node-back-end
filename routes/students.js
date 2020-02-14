var express = require("express");
var router = express.Router();
var studentservices = require("../api/studentApi");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/login", studentservices.stulogin)
router.get("/changePass", studentservices.changePass)
router.get("/allteacher", studentservices.allTeacher)
router.get("/teacherbyid", studentservices.teacherById)
router.get("/regular", studentservices.chooseRegular)
router.get("/graduate", studentservices.chooseGraduate)
router.get("/mytutor", studentservices.tutorResult)
router.get("/info", studentservices.writeinfo);
router.get("/selected", studentservices.selectedResult)
router.get("/queryinfo", studentservices.readinfo)
module.exports = router;
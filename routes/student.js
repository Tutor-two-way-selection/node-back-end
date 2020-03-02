var express = require("express");
var router = express.Router();
var studentservices = require("../api/studentApi");


router.post("/login", studentservices.stulogin)
router.post("/changePass", studentservices.changePass)
router.post("/allteacher", studentservices.allTeacher)
router.post("/regular", studentservices.chooseRegular)
router.post("/graduate", studentservices.chooseGraduate)
router.post("/mytutor", studentservices.tutorResult)
router.post("/info", studentservices.writeinfo);
router.post("/selected", studentservices.selectedResult)
router.post("/queryinfo", studentservices.readinfo)
router.post("/baseInfo", studentservices.baseInfo)
router.post("/changeBaseInfo", studentservices.changeBaseInfo)
module.exports = router;
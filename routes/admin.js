var express = require("express");
var router = express.Router();
var adminservices = require("../api/adminApi");


router.post("/login", adminservices.login)
router.post("/stulist", adminservices.stulist)
router.post("/situation", adminservices.situation)
router.post("/manual", adminservices.manual)
router.post("/undistri", adminservices.undistri)
router.post("/setpub", adminservices.setpub)
router.post("/querypub", adminservices.querypub)
router.post("/querybatch", adminservices.querybatch)
router.post("/setbatch", adminservices.setbatch)
router.post("/final", adminservices.final)
router.post("/addStu", adminservices.addStu)
module.exports = router
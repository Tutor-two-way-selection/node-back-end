var express = require("express");
var router = express.Router();
var teacherservices = require("../api/teacherApi");

router.get("/login", teacherservices.login)
router.get("/info", teacherservices.info)
router.get("/changeinfo", teacherservices.changeinfo)
router.get("/stuinfo", teacherservices.stuinfo)
router.get("/selectstu", teacherservices.selectstu)
module.exports = {
    router
}
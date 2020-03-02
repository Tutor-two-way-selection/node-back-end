var express = require("express");
var router = express.Router();
var teacherservices = require("../api/teacherApi");

router.post("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.post("/login", teacherservices.login)
router.post("/info", teacherservices.info)
router.post("/changeinfo", teacherservices.changeinfo)
router.post("/stuinfo", teacherservices.stuinfo)
router.post("/selectstu", teacherservices.selectstu)
router.post("/accepted", teacherservices.accepted)
module.exports = router
var express = require("express");
var router = express.Router();
var adminservices = require("../api/adminApi");
var systemset = require("../systemset.json")
router.get("/", function (req, res) {
    console.log(systemset);
    res.send(systemset)
})
router.get("/login",adminservices.login)
router.get("/stulist",adminservices.stulist)
router.get("/situation",adminservices.situation)
router.get("/manual",adminservices.manual)
router.get("/undistri",adminservices.undistri)
router.get("/setpub",adminservices.setpub)
router.get("/querypub",adminservices.querypub)
router.get("/querybatch",adminservices.querybatch)
router.get("/setbatch",adminservices.setbatch)
router.get("/final",adminservices.final)
module.exports = router
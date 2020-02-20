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
module.exports = router
const express = require("express")
const router = express.Router()
const controller = require("../controller/userController")
const upload = require('../lib/s3.js').getMulter("users");

/* 유저 정보 가져오기 (default - 거리순 정렬) */
router.get("/:user_id", controller.getuserById)

module.exports = router

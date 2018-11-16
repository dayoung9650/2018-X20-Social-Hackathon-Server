const express = require("express")
const router = express.Router()
const controller = require("../controller/postController")
const upload = require('../lib/s3.js').getMulter("posts");

/* 모든 포스트 가져오기 (default - 거리순 정렬) */
router.get("/:flag", controller.getPosts) 

/* insert */
router.post('/',  upload.array('img',1), controller.addPosts);

/* 특정 유저가 쓴 글 조회 */
router.get('/user/:user_id', controller.getPostByUser);

router.get("/post/:post_id", controller.getOnePost);

module.exports = router
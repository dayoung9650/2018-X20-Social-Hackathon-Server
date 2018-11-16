var express = require('express')
var router = express.Router()
const post = require('./post')
const user = require('./user')

router.use("/posts", post)
router.use("/users", user);

module.exports = router

/*
사용자 ( 판매자 / 구매자 둘다가 될 수 있음) 
- 이름 -string
- 판매자 사진 - image
- userId 필요

음식
- 판매자 이름
- 음식사진 - image
- 음식이름 - string
- 올린 시간  + 24시간 - date
- 수령 장소 + 시간 (복수 가능) ex) 11:30 불광역, 15:00 대조동 84-32
- 음식 설명 - string
- 유통기한 - string
- 위도 / 경도? 혹은 나와의 거리..
- 음식이 팔렸나 안팔렸나 - int(팔리면1, 안팔렸으면0 으로 하자)
*/
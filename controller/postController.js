const { respondJson, respondOnError } = require('../lib/response');
const postsLogic  = require('../logic/postsLogic')
const s3Location = require('../config/s3').region


/* 모든 포스트 가져오기 */
const getPosts = async(req, res) => {
    try{
        let flag = req.params.flag;
        let lat = req.query.lat ? req.query.lat : ''
        let lon = req.query.lon ? req.query.lon : ''
        let result = await postsLogic.getPosts(flag, lat, lon); 
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}

const getPostByUser = async(req, res) =>{
    try{
        let user_id = req.params.user_id ? req.params.user_id : 0;
        let result = await postsLogic.getPostByUser(user_id); 
        console.log(result)
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}

const getOnePost = async(req, res) => {
    try{
        let post_id = req.params.post_id ? req.params.post_id : 0;
        let result = await postsLogic.getOnePost(post_id); 
        console.log(result)
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}
/* 포스트 등록 */
const addPosts = async(req, res)=>{
    try{
        // // title, img, time,places,info, expire, loc, isSell
        let posts_img = req.files
        posts_img = posts_img ? posts_img[0].location : ''
        console.log(posts_img)
        let title = req.body.title;
        let places = req.body.places;
        let info = req.body.info;
        let expire = req.body.expire;
        let lat = req.body.lat;
        let lon  =req.body.lon;
        let isSell = req.body.isSell;
        let available = req.body.available; 

        let result = await postsLogic.addPosts(title, posts_img, places, info, expire, lat, lon, isSell, available);
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    }
}
module.exports={
    getPosts,
    addPosts,
    getOnePost,
    getPostByUser
}
/*
CREATE TABLE `root`.`posts` (
    `posts_id` INT NOT NULL,
    `posts_title` VARCHAR(200) NULL,
    `posts_img` VARCHAR(100) NULL,
    `posts_time` DATETIME NULL,
    `posts_places` VARCHAR(200) NULL,
    `posts_info` VARCHAR(500) NULL,
    `posts_expire` VARCHAR(45) NULL,
    `posts_loc` POINT NULL,
    `posts_isSell` INT NULL,
    PRIMARY KEY (`posts_id`));
  */
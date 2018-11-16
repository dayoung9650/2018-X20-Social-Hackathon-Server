const s3 = require('../config/s3').region
const moment = require('moment');
// var db=require('../config/database');
const db = require('../lib/db');

//최신순정렬
const selectPosts = async () => {
    const sql = `SELECT * FROM posts, users where posts.user_id = users.user_id order by posts.posts_time`
    const result = await db.query(sql)
    return result
}

//거리순 정렬
const selectPostsSortByDis = async(lat, lon) =>{
    const sql = `SELECT * FROM posts, users where posts.user_id = users.user_id`
    const result = await db.query(sql)
    return result
}

//특정 유저의 게시물 조회 
const selectPostByUser = async(user_id) =>{
    const sql =`SELECT * FROM posts WHERE user_id = ?`
    const result = await db.query(sql, [user_id])
    return result;
}

const insertPosts = async (title, img, places, info, expire, lat, lon, isSell, available) => {
    let user_id = 1;
    const sql = `
    INSERT INTO posts (posts_lat, posts_lon, posts_title, posts_img, posts_time, posts_places, posts_info, posts_expire,posts_isSell, user_id, available) VALUES (?,?,?, ?, date(?), ?, ?, ?, ?, ?, ?)`
    await db.query(sql, [lat, lon, title, img,  moment().format('MMMM Do YYYY, h:mm:ss a'), places, info, expire, isSell,user_id, available])

}
const selectOnePost = async(post_id) => {
    let sql = `SELECT * from posts, users where posts.posts_id =?`
    return await db.query(sql, [post_id])
}
module.exports={
    selectPosts,
    insertPosts,
    selectOnePost,
    selectPostsSortByDis,
    selectPostByUser
}
const s3 = require('../config/s3').region
const moment = require('moment');
// var db=require('../config/database');
const db = require('../lib/db');

//user 정보 
const selectUserById = async (user_id) => {
    let result = {posts:[]}

    const sql1 = `SELECT * FROM users where users.user_id = ?`
    let user = await db.query(sql1, [user_id])
    result.user_id = user[0].user_id
    result.user_name = user[0].user_name
    result.user_profile = user[0].user_profile

    const sql2 = `select posts_id, posts_title, posts_info, posts_img from posts where user_id = ?`
    let p = await db.query(sql2, [user_id])
    p.forEach(element => {
        result.posts.push(element)
    });
    console.log(result)
    return result
}
module.exports={selectUserById};

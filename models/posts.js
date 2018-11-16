const s3 = require('../config/s3').region
const moment = require('moment');
// var db=require('../config/database');
const db = require('../lib/db');
const distance = require('../lib/distance');

//최신순정렬
const selectPosts = async () => {
    const sql = `SELECT * FROM posts, users where posts.user_id = users.user_id order by posts.posts_time desc`
    const result = await db.query(sql)
    return result
}

//거리순 정렬
const selectPostsSortByDis = async(lat, lon) =>{
    const sql = `SELECT * FROM posts, users where posts.user_id = users.user_id`
    const posts = await db.query(sql)

    let result = [];
    for( var i = 0 ; i < posts.length ; i++ ) {
        let distanceData = distance(lat, lon, posts[i].posts_lat , posts[i].posts_lon );
        let data = {
            posts_id : posts[i].posts_id ,
            posts_title : posts[i].posts_title ,
            posts_img :  posts[i].posts_img ,
            posts_places : posts[i].posts_places ,
            posts_info : posts[i].posts_info ,
            posts_expire : posts[i].posts_expire ,
            posts_lat : posts[i].posts_lat ,
            posts_isSell : posts[i].posts_isSell ,
            user_id : posts[i].user_id ,
            posts_lon : posts[i].posts_lon ,
            user_name : posts[i].user_name ,
            user_profile : posts[i].user_profile ,
            distance : Number( distanceData.distance ) ,
            distanceUnit : distanceData.unit
        }
        result.push( data ) ;
    }
    result.sort( function( a , b ) {
        var tmpA = a.distance;
        var tmpB = b.distance;
        if( a.distanceUnit === 'Km' )
            tmpA = a.distance * 1000
        if( b.distanceUnit === 'Km' )
            tmpB = b.distance * 1000
        return ( tmpA >= tmpB )? 1 : -1 ;
    });
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
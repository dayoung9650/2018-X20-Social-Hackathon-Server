const posts = require('../models/posts');


/* 모든 포스트 가져오기 (default - 최신순 정렬) */
const getPosts = async(flag, lat,lon) => {
    let result;
    if(flag == 1) result = await posts.selectPostsSortByDis(lat, lon); //거리순
    else result = await posts.selectPosts(); //최신순순
    return result;
}

/* 포스트 등록 */
const addPosts = async(title, img , places, info, expire, lat, lon, isSell, available)=>{
    let result = await posts.insertPosts(title, img, places, info, expire, lat, lon, isSell, available);
    return result;
}
const getOnePost = async(post_id)=>{
    let result = await posts.selectOnePost(post_id)
    return result;
}
const getPostByUser = async(user_id)=>{
    let result = await posts.selectPostByUser(user_id);
    return result;
}

module.exports ={
    getPosts,
    addPosts,
    getOnePost,
    getPostByUser}
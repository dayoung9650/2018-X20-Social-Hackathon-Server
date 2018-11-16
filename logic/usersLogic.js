const users = require('../models/users');


/* 모든 유저정보 가져오기 (default - 최신순 정렬) */
const getUserById = async(user_id) => {
    let result;
    result = await users.selectUserById(user_id); //최신순
    return result;
}
module.exports={getUserById};
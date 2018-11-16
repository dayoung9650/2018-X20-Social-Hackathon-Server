const { respondJson, respondOnError } = require('../lib/response');
const usersLogic  = require('../logic/usersLogic')
const s3Location = require('../config/s3').region


/* 모든 유저 가져오기 */
const getuserById = async(req, res) => {
    try{
        let user_id = req.params.user_id;
        let result = await usersLogic.getUserById(user_id);
        respondJson("Success", result, res, 200);
    }catch(err){
        console.log(err);
        respondOnError(err.message, res, err.statusCode);
    } 
}
module.exports={getuserById};
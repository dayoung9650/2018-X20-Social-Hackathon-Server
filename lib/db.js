const mysql = require('promise-mysql')
const dbConfig= {
  host        : 'root.cpgtkojuz64e.ap-northeast-2.rds.amazonaws.com',
  port        : 3306,
  user        : 'root',
  password    : 'HEaaFCG7mrsUc6c',
  database    : 'innodb',
  serverId    : 256,
  minInterval : 200,
  acquireTimeout: 300,
  connectionLimit: 100,
  connectTimeout: 2000,
  queueLimit: 0,
  debug: true,
  waitForConnection: true,
  dateStrings: true
}

let DBpool
const getPool = () => {
  if (!DBpool) {
    DBpool = mysql.createPool(dbConfig)
    return DBpool
  }
  return DBpool
}

module.exports = {
  query : async (...args) => {
    const query = args[0]
    const data = args[1]
    const pool = getPool()
    let connection = await pool.getConnection()
    let result = await connection.query(query, data)

    connection.release()
    return result
  },
  transaction : async (...args) => {
    let result = "Success"

    let connection

    try{
      const pool = getPool()
      connection = await pool.getConnection()
      await connection.beginTransaction()

      await args[0](connection, ...args)
      await connection.commit()
    }
    catch(err){
      await connection.rollback()
      console.log("mysql error : " + error)
      result = undefined
    }
    finally {
      connection.release()
      return result
    }
  }
}
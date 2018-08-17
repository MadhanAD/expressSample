const mysql = require('mysql')

const DbConfig = require('./DbConfig')
const Logger = require('../../utils/Logger')

const TAG = 'DbConnection'

const dbConfiguration = {
    host : DbConfig.DATABASE_URL,
    user : DbConfig.DATABASE_USER,
    password : DbConfig.DATABASE_PASSWORD,
    port : DbConfig.DATABASE_PORT,
    database : DbConfig.DATABASE_NAME
}

const connection = mysql.createConnection(dbConfiguration)

connection.connect((error) => {
    if(error){
        //handle database connection error
        Logger.log(`connection error ${error}`)
    }else{
        //connection established 
        Logger.log(`connection established`)
    }
})

exports.connection = connection
const connection = require('./database/DbConnection')
const mysql = connection.connection
const Logger = require('./../utils/Logger')

const TAG = 'UserModel'

//SQL queries

function getInsertUserQuery(data){
     return `INSERT INTO \`users\`(name,uniqueId,lat,lng,address) VALUES ("${data.name}","${data.uniqueId}",${data.lat},${data.lng},"${data.address}");`
}

function getAllUserQuery(){
    return 'SELECT * FROM \`users\`';
}

function getSingleUserQuery(userId){
    return `SELECT * FROM \`users\` WHERE id=${userId}`
}

function getUserById(userId,res){
    const query = getSingleUserQuery(userId)
    mysql.query(query, (error,rows,fields) => {
        if(!error){
            res.json({
                status : true,
                statusMessage : `Registered successfully`,
                data : {
                    userId : rows[0].uniqueId
                }
            })
        }else{
            res.json({
                status : false,
                statusMessage : `unable to retrieve user id , Exception : ${error}`,
                data : []
            })
        }
    })
}

exports.insertUser = (req,res,next) => {
    let reqData = req.body
    const query = getInsertUserQuery(reqData)
    
    mysql.query(query, (error,rows,fields) => {
        if(!error){
            getUserById(rows.insertId,res)

        }else{
            res.json({
                status : false,
                statusMessage : `unable to insert, Exception : ${error}`,
                data : []
            })
        }
    })
}

exports.getAllUsers = (req,res,next) => {
    mysql.query(getAllUserQuery(),(error,rows,fields) => {

        if(!error){
            let dataArray =[]

            rows.forEach(element => {
                dataArray.push({
                    'userName' : element.name,
                    'latitude' : element.lat,
                    'longitude' : element.lng,
                    'address' : element.address
                })
            });
            res.json({
                status : true,
                stateMessage : 'List of users',
                data : dataArray
            })

           

        } else {
            res.json({
                status : false,
                stateMessage : error,
                data : []
            })
        }
    })
}
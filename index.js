const express = require('express')
const bodyParser = require('body-parser')

const connection = require('./src/models/database/DbConnection')

const userRouter = require('./src/routers/UserRouter')

const Logger = require('./src/utils/Logger')

const app = express()

//Body parser
app.use(express.json());

//router middleware
app.use('/user',userRouter)



app.listen(3010, () => {
    Logger.log('Survey app is listening on post : 3010')
})


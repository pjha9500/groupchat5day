require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const User=require('./models/user');

const sequelize = require('./util/database')
const userRoutes = require('./routes/user')


const app = express()


app.use(cors())
app.use(bodyParser.json())

app.use(userRoutes)


sequelize.sync()
.then((res)=>{
    //console.log(res)
    app.listen(3000)
}).catch(err=>console.log(err))
const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const saltRounds = 10;


 exports.authenticateToken = (req, res, next)=> {
    try{
        const token=req.header('authorization')

        const userId=jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(userId)
        User.findByPk(userId).then(user=>{
            //console.log(JSON.stringify(user))
            req.user=user;
            next();
        })
        .catch(err=>{
            throw new Error(err)
        })
    }

    catch(err){
        console.log(err)
         res.status(404).JSON({sucess:false})
    }
}
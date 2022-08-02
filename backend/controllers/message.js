const express=require('express');
const Message=require('../models/message')
const Group=require('../models/group')

exports.addMessage=(req,res)=>{

    const groupid=req.body.groupid
    let msg=req.body.msg
    console.log(req.user.name)
    req.user.createMessage({
        
        msg:msg,
        username:req.user.name,
        groupid:groupid

    }).then(ress=>{
       res.status(200).json("message added")
    })
    .catch(err=>{
        console.error(err)
    })
}

exports.getMessages=async(req,res)=>{
    const lastId=req.query.lastmsg||0
    console.log(lastId);
    let groupid=req.query.groupid
    let lastIdN=+lastId
    const userid=req.user.id
   
    groupid=+groupid
    let trueuser=false

    await Group.findByPk(groupid).then(async(groups)=>{
        

       const userids=groups.users.split(',')
       console.log(userids.length)

       for(let i=0;i<userids.length;i++){
           if(userid==userids[i]){
            trueuser=true
           }
            }
               
            })
            .catch(err=>{
                console.error(err)

     })

    if(trueuser){
        Message.findAll({offset:lastIdN,where:{groupid:groupid}}).then(msgs=>{
        // userdata=msgs.data
        // console.log(userdata)
        res.json(msgs)
    })
    .catch(err=>{
        console.error(err)
    })

    }
    else{
        return res.json("user not allowed")
    }

}
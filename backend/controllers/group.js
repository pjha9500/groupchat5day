const User=require('../models/user')
const Group=require('../models/group')

exports.createGroup=(req,res)=>{

    let groupname=req.body.groupname
    let users=req.body.users
    console.log(req.user.name)
    req.user.createGroup({
        
        groupname:groupname,
        users:req.user.id.toString()
        

    }).then(ress=>{
       res.status(200).json("group added")
    })
    .catch(err=>{
        console.error(err)
    })
}
exports.getGroups=(req,res)=>{
    Group.findAll().then(groups=>{
        res.status(200).json(groups)
    })
    .catch(err=>{
        console.error(err)

    })
}

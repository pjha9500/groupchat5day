const Sequelize=require('sequelize');


const sequelize=new Sequelize('groupchat','root','Pjha@11810995',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize; 
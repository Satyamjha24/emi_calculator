const express=require('express')
const userRouter=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const { UserModel } = require('../model/user.model')



userRouter.post('/register', async (req,res)=>{

    const {email,pass,name}=req.body
    try{
        bcrypt.hash(pass, 5, async (err,hash)=>{
            const user= new UserModel({email,pass:hash, name})
            await user.save()
            res.status(200).send({"msg": "Registration has been done"})
        })
       
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

userRouter.post('/login', async (req,res)=>{
    const {email,pass}=req.body
    try{
        const user =await UserModel.findOne({email})

        if(user){
            bcrypt.compare(pass,user.pass, (err, result) =>{
                if(result){
                    res.status(200).send({"msg":"Login Successful!","token":jwt.sign({"userID":user._id}, 'odinson')})
                }else{
                    res.status(400).send({"msg":"login failed"})
                }
            })
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={userRouter}


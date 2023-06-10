const express = require('express');
const { emiModel } = require('../model/emi.model');
const jwt=require('jsonwebtoken')
const emiRouter = express.Router()


emiRouter.get('/calculate', async (req,res)=>{
    try{
        const post=await emiModel.find()
        res.status(200).send(post)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
emiRouter.post('/calculate', async (req, res) => {

    const { rate, amount, tenure } = req.body

    let principal = amount;
    let interestRate = rate / 12 / 100;
    let timePeriods = tenure;

    let numerator = principal * interestRate * Math.pow((1 + interestRate), timePeriods);
    let denominator = Math.pow((1 + interestRate), timePeriods) - 1;

    let result = numerator / denominator;
    let interest_payable = Math.ceil(result);
    let emi = interest_payable * tenure;
    let total_payable = amount + emi;
    let emi_data ={emi,interest_payable,total_payable}
    try {
            
            let post=new emiModel(emi_data)
            await post.save()
            res.status(200).send({ "msg": "New post added" })
        

    } catch (err) {
        res.status(400).send({ "msg": err.message})
    }
})

module.exports = { emiRouter }

/* 
{
  "rate": 14,
  "amount": 100000,
  "tenure":36
}
postRouter.get('/', async (req,res)=>{
    let min=req.query.min 
    let max=req.query.max
    const token=req.headers.authorization
    const decoded=jwt.verify(token,'odinson')
    try{
        if(decoded){
            if(min && max){
                const post=await PostModel.find({$and:[{no_of_comments:{$gt:min}},{no_of_comments:{$lt:max}}]})
                res.status(200).send(post)
            }else{
                const post=await PostModel.find({'userID':decoded.userID})
                res.status(200).send(post)
            }
           
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.post('/add', async (req,res)=>{
    try{
        let post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"New post added"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
*/
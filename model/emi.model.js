const mongoose=require('mongoose')

const emiSchema=mongoose.Schema({
    emi:Number,
    interest_payable:Number,
    total_payable:Number
})

const emiModel=mongoose.model('emi' ,emiSchema)

module.exports={emiModel}
const mongoose=require("mongoose")
const Schema=mongoose.Schema

const buySchema=new Schema({
    productname:String,
    name:String,
    image:String,
    email:String,
    date:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
})

module.exports=mongoose.model("Buy",buySchema)
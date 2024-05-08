const mongoose=require("mongoose")
const Schema=mongoose.Schema

const cartSchema=new Schema({
    image:String,
    title:String,
    productid:String,
    date:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
})

module.exports=mongoose.model("Cart",cartSchema)
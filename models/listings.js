const mongoose=require("mongoose")
const Schema=mongoose.Schema

const listingSchema=new Schema({
    title:String,
    image:String,
    description:String,
    price:Number,
    reviews:[
        {
          type:Schema.Types.ObjectId,
          ref:"Reviews",
        }
    ],
})

module.exports = mongoose.model("Listing", listingSchema);
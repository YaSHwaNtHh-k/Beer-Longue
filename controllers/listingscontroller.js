const Listing = require("../models/listings.js")
const cart=require("../models/cart.js");
const User=require("../models/user.js")
const Buy=require("../models/buy.js")

module.exports.main=async(req,res)=>{
  res.render("listings/main.ejs")
}

module.exports.contact=async(req,res)=>{
  res.render("listings/contact.ejs")
}

module.exports.profile=async(req,res)=>{
  let id=req.user._id
  const user=await User.findById(id)
  res.render("listings/profile.ejs",{user})
}

module.exports.index=async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
}
module.exports.searchform=async(req,res)=>{
  const searchQuery = req.body.searchQuery;
  const listing = await Listing.find({title:searchQuery})
  if(listing.length == 0 ){
    req.flash("failure","This Type of Listing Not Exists!")
    return res.redirect("/listings")
  }
  if (listing) {
    listing.forEach(function(listing) {
      res.redirect(`/listings/${listing._id}`)
    })
  }
}

module.exports.showform=async(req,res)=>{
    const {id}=req.params
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
          path:"author",
        }
      })
    res.render("listings/show.ejs",{listing})
}

module.exports.addtocart=async(req,res)=>{
  let{id}=req.params
  const listing=await Listing.findById(id)
  const newcart= new cart({
    image:listing.image,
    title:listing.title,
    productid:listing._id,
  })
  newcart.author=req.user._id;
  await newcart.save()
  console.log(newcart)
  req.flash("success","Product added to cart Successfully")
  res.redirect(`/Cart`)
}

module.exports.cartform=async(req,res)=>{
  let allcart=await cart.find({})
  res.render("listings/cart.ejs",{allcart})
}

module.exports.buyformget=async(req,res)=>{
  let {id}=req.params
  res.render("listings/buy.ejs",{id})
}
module.exports.buyformpost=async(req,res)=>{
  let user=req.user._id
  let{id}=req.params
  let {name,email}=req.body
  let product=await Listing.findById(id)
  const neworder=new Buy({
    name:name,
    email:email,
    image:product.image,
    productname:product.title,
    author:user
  })
  await neworder.save()
  if(neworder.save()){
    res.redirect("/orders")
    req.flash("success","You'r Order Placed Successfully")
  }
}

module.exports.orderform=async(req,res)=>{
  let allbuy=await Buy.find({})
  res.render("listings/orders.ejs",{allbuy})
}
module.exports.orderdeleteform=async(req,res)=>{
  let {id}=req.params
  await Buy.findByIdAndDelete(id)
  req.flash("success","Product Deleted Successfully")
  res.redirect("/orders")
}

module.exports.deleteform=async(req,res,next)=>{
  let {id}=req.params;
  await cart.findByIdAndDelete(id)

  req.flash("success","Cart Product Deleted Successfully!")

  res.redirect(`/cart`)
}
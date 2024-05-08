const Review=require("./models/reviews.js")

module.exports.loggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("You must logged in to create New Listing")
        return res.redirect("/login")
    }
    next()
}  

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.reviewowner=async(req,res,next)=>{
  let { id,reviewId } = req.params;
  const review=await Review.findById(reviewId)
  if(!review.author._id.equals(res.locals.currUser._id)){
    req.flash("failure","You are not a Creator of this Review")
    return res.redirect(`/listings/${id}`)
  }
  next()
}
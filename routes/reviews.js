const express=require("express");
const reviewcontroller = require("../controllers/reviewcontroller");
const router=express.Router()
const {loggedin,saveRedirectUrl,reviewowner}=require("../middleware.js")

router
    .route("/listings/:id/reviews")
    .post(loggedin,saveRedirectUrl,reviewcontroller.reviewform)

router
    .route("/listings/:id/reviews/:reviewId")
    .delete(reviewowner,reviewcontroller.deleteform)

module.exports=router
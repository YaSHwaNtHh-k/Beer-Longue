const express=require("express");
const listingscontroller = require("../controllers/listingscontroller");
const router=express.Router()
const {loggedin,saveRedirectUrl}=require("../middleware.js")

router
    .route("/")
    .get(listingscontroller.main)

router
    .route("/contact")
    .get(listingscontroller.contact)

router
    .route("/profile")
    .get(loggedin,saveRedirectUrl,listingscontroller.profile)

router
    .route("/listings")
    .get(listingscontroller.index)

router
    .route("/listings/:id/buy")
    .get(loggedin,saveRedirectUrl,listingscontroller.buyformget)
    .post(listingscontroller.buyformpost)

router
    .route("/search")
    .post(listingscontroller.searchform)

router
    .route("/cart")
    .get(loggedin,saveRedirectUrl,listingscontroller.cartform)

router
    .route("/orders")
    .get(loggedin,saveRedirectUrl,listingscontroller.orderform)

router
    .route("/orders/:id")
    .delete(loggedin,saveRedirectUrl,listingscontroller.orderdeleteform)

router
    .route("/cart/:id")
    .delete(listingscontroller.deleteform)

router
    .route("/listings/:id")
    .get(listingscontroller.showform)
    .post(loggedin,saveRedirectUrl,listingscontroller.addtocart)

module.exports=router
const express=require("express");
const usercontroller = require("../controllers/usercontroller");
const router=express.Router()
const passport=require("passport")
const {saveRedirectUrl}=require("../middleware.js")

router
    .route("/signup")
    .get(usercontroller.signupget)
    .post(usercontroller.signuppost)

router
    .route("/login")
    .get(usercontroller.loginget)
    .post(saveRedirectUrl,
    passport.authenticate('local',{
        failureRedirect:"/login",
        failureFlash:true,
    }), 
    usercontroller.loginpost
    )

router
    .route("/logout")
    .get(usercontroller.logout)

module.exports=router
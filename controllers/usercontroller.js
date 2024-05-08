const User=require("../models/user.js")

module.exports.signupget=async(req,res)=>{
    res.render("user/signup")
}

module.exports.signuppost=async(req,res)=>{
    try{
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeUser = await User.register(newUser, password);
        req.login(registeUser,(err)=>{
        if(err){
            next(err)
        }
        req.flash("success","Successfully Signup")
        res.redirect("/listings")
    })
    console.log(registeUser)
    }
    catch(e){
        req.flash("failure","User with This Credintials Already Exists")
        res.redirect("/signup")
    }
}
module.exports.loginget=async(req,res)=>{
    res.render("user/login.ejs")
}
module.exports.loginpost=async(req,res)=>{
    req.flash("success","Successfully Login!")
    if(!res.locals.redirectUrl){
        return res.redirect("/listings")
    }
    res.redirect(res.locals.redirectUrl)
}

module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
    })
    req.flash("success","logged out Successfully!")
    res.redirect("/listings")
}
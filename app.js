if(process.env.NODE_ENV!="productions"){
  require('dotenv').config()
}

const express=require("express")
const app=express()
const port=3000
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const mongoose=require("mongoose")
const session=require("express-session")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const flash=require("connect-flash")
const  MongoStore=require("connect-mongo")

const listingroute=require("./routes/listings.js")
const userroute=require("./routes/user.js")
const reviewroute=require("./routes/reviews.js")

const User=require("./models/user.js")

//const MONGO_URL="mongodb://127.0.0.1:27017/beerlongue";
const DB_URL=process.env.ATLASDB_URL


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))
app.engine("ejs",ejsMate)
app.use(express.json());

const store = MongoStore.create({
  mongoUrl:DB_URL,
  crypto:{
    secret:"mysecratecode",
  },
  touchAfter:24*60,
});

const sessionOption={
  store,
  secret:"mysecratecode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expire:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
}


app.use(session(sessionOption))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.failure=req.flash("failure")
  res.locals.currUser=req.user
  next();
});


app.use("/",listingroute)
app.use("/",userroute)
app.use("/",reviewroute)

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})
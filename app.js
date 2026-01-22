if (process.env.NODE_ENV != "production") {
      require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); // Add this line at the top
const app = express();
const ExpressError = require("./utils/ExpressError.js");
const path = require("path");
const methodOverride = require('method-override');
const cors = require('cors');

//routers
const listingsRouter = require("./routes/listing.js");
const  reviewsRouter = require("./routes/review.js");
const  userRouter = require("./routes/user.js");

//passport and user aunthication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.engine('ejs', ejsMate);
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));

// CORS for React frontend
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true
}));

//database
const db_url ="mongodb://127.0.0.1:27017/wonderlust";
//const db_url =process.env.ATLASDB_URL;
async function main() {
      await mongoose.connect(db_url);
}
main().then(()=>{console.log("connected to database")})
      .catch((error)=>{console.log(error)});


app.get("/",(req,res)=>{
      res.send("working fine");
})

const store = MongoStore.create({
      mongoUrl:db_url,
      crypto:{
            secret: process.env.SECRET,
      },
      touchAfter:24*3600,
})
store.on("error",()=>{
      console.log("Error in mongo session store (app.js line 57)",err)
})
//session Options
const session_options = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // Corrected spelling
    }
}
//session 
app.use(session(session_options))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success"); //middleware for flash used in session
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next(); 
})


// API Routes for React Frontend

// Listings API - returns JSON instead of EJS
const Listing = require("./models/Listing.js");

app.get("/api/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.json(allListings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    
    if (!data) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/checkauth", (req, res) => {
  if (req.user) {
    res.json({ 
      user: req.user,
      token: req.user._id.toString() // Simple token for demo
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Auth endpoints returning JSON
app.post("/api/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || "Invalid credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ 
        user,
        token: user._id.toString()
      });
    });
  })(req, res, next);
});

app.post("/api/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    
    // Auto login after signup
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({
        user: registeredUser,
        token: registeredUser._id.toString()
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

//demo user
app.get("/demouser",async (req, res)=>{
      let fakeUser = new User({
            email:"student@gmail.com",
            username:"delta-student"
      });
      let registeredUser =await User.register(fakeUser,"helloworld");
      res.send(registeredUser);
})

// working with routs
app.use("/listing",listingsRouter);
app.use("/listing/:id/reviews", reviewsRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
      next(new ExpressError(401,"Page Not Found!"));
});
app.use((err,req,res,next)=>{
      let{statuscode =500,message="Some thing went wrong"} =err;
      res.status(statuscode).render("listings/error.ejs",{err});
      
})
app.listen(8081,()=>{
      console.log("server is listerning to port 8081");
})



























// app.get("/listingCheak", async(req,res)=>{

//       let testListing = new Listing({
//             title:"villa",
//             description:"enjoy your holidays",
//             price:20000,
//             location:"goa",
//             country:"india",
//       });
//       await testListing.save();
//       console.log("Sample was saved ");
//       res.send("Successful testing");
// })

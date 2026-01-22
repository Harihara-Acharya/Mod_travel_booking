const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// Signup routes
router.route("/signup")
    .get(UserController.renderSignupForm)
    .post(wrapAsync(UserController.signup));

// Login routes
router.route("/login")
    .get(UserController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate('local', { 
            failureRedirect: '/login', 
            failureFlash: true 
        }),
        UserController.login
    );

// Logout route
router.get("/logout", UserController.logout);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const User = require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync.js");
// const passport = require("passport");
// const {saveRedirectUrl} = require("../middleware.js");
// router.get("/signup",(req,res)=>{
//       res.render("users/signup.ejs");
// })

// router.post("/signup" , wrapAsync(async(req,res)=>{
//       try {
//       let {username, email, password} =req.body;
//       const newUser = new User({email, username});
//       const registeredUser = await User.register(newUser,password);
//       console.log(registeredUser);

      
//       req.login(registeredUser, function(err) {//login on signup
//             if (err) { return next(err); }
//             req.flash("success","Welcome to wonderlust")
//             res.redirect("/listing");  
//       });
                
//       } catch (error) {
//             req.flash("error",error.message)
//             res.redirect("/signup");
//       }
// }));

// router.get("/login", (req,res)=>{
//       res.render("users/login.ejs");
// })

// router.post("/login",saveRedirectUrl,
//       passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),
//       async(req,res)=>{
//             req.flash("success","welcome backto wonderlust");
//             let redirectUrl = res.locals.redirectUrl || "/listing"
//             res.redirect(redirectUrl);
//       }
// )

// router.get("/logout",(req,res,next)=>{
//       req.logout((err)=>{
//             if (err) {
//                   return next(err);
//             }
//             req.flash("success","You logged out !");
//             res.redirect("listing");
//       })
// })
      
// module.exports =router;
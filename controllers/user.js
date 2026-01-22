const User = require("../models/user.js");

// Render signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Handle user signup
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        // Login on signup
        req.login(registeredUser, function(err) {
            if (err) { 
                return next(err); 
            }
            req.flash("success", "Welcome to Wonderlust!");
            res.redirect("/listing");
        });

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

// Render login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Handle user login
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wonderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
};

// Handle user logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You logged out!");
        res.redirect("/listing");
    });
};

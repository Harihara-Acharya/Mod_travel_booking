const express = require("express");
const router = express.Router();
const ListingController = require("../controllers/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage })

// Routes for "/" (index and create)
router.route("/")
    .get(wrapAsync(ListingController.index))
    .post(
        isLoggedIn, 
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(ListingController.createListing)
    );

// New route (must be before /:id to avoid conflicts)
router.get("/new", isLoggedIn, ListingController.renderNewForm);

// Routes for "/:id" (show, update, delete)
router.route("/:id")
    .get(wrapAsync(ListingController.showListing))
    .put(
        isLoggedIn,
        upload.single("listing[image]"), 
        isOwner, 
        validateListing, 
        wrapAsync(ListingController.updateListing)
    )
    .delete(
        isLoggedIn, 
        isOwner, 
        wrapAsync(ListingController.destroyListing)
    );

// Edit route
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner, 
    wrapAsync(ListingController.renderEditForm)
);

module.exports = router;

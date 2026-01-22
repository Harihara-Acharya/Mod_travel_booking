const Listing = require("../models/Listing");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

// Render new listing form
module.exports.renderNewForm = (req, res) => {
    return res.render("listings/add.ejs");
}

// Show individual listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!data) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listing");
    }
    res.render("listings/show.ejs", { data });
}

// Create new listing
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log({url,filename})
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename}
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
}

// Render edit form
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    
    if (!data) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listing");
    }
    let originalImage = data.image.url;
    originalImage = originalImage.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { data, originalImage });
}

// Update listing
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const lsdata = req.body.listing;
    let listing = await Listing.findByIdAndUpdate(id, { ...lsdata });
    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    
    req.flash("success", "Current Listing edited successfully!");
    res.redirect(`/listing/${id}`);
}

// Delete listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing successfully Deleted!");
    res.redirect("/listing");
}

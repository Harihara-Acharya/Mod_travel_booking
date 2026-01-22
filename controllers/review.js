

const Review = require("../models/review.js")
const Listing = require("../models/Listing.js");

module.exports.createReview =async(req,res)=>{
      let listing = await Listing.findById(req.params.id); 
      let newReview = new Review(req.body.review);
      newReview.author = req.user._id;
      listing.reviews.push(newReview);
      await newReview.save();
      await listing.save();
      req.flash("success","New Review Created !");
      // console.log("new review saved");
      res.redirect(`/listing/${listing._id}`);
}

module.exports.destroyReview =async(req,res)=>{
       let {id , reviewId } = req.params;
       await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId }});
       await Review.findByIdAndDelete(reviewId);
      req.flash("success","A Review Deleated !");
       res.redirect(`/listing/${id}`);
 }
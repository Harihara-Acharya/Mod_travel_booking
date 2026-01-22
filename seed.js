// seed.js
require("dotenv").config(); // Load variables from .env
const mongoose = require("mongoose");
const User = require("./models/user");
const Review = require("./models/review");
const Listing = require("./models/Listing");

// Sample data (7 each)
const ids = {
  users: [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
  ],
  reviews: [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
  ],
  listings: [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
  ],
};

const users = [
  { _id: ids.users[0], email: "alice@wanderstay.test",  username: "alice"  },
  { _id: ids.users[1], email: "bob@wanderstay.test",    username: "bob"    },
  { _id: ids.users[2], email: "charlie@wanderstay.test",username: "charlie"},
  { _id: ids.users[3], email: "diana@wanderstay.test",  username: "diana"  },
  { _id: ids.users[4], email: "eva@wanderstay.test",    username: "eva"    },
  { _id: ids.users[5], email: "frank@wanderstay.test",  username: "frank"  },
  { _id: ids.users[6], email: "gita@wanderstay.test",   username: "gita"   },
];

const reviews = [
  { _id: ids.reviews[0], comment: "Wonderful stay!", rating: 5, author: ids.users[1] },
  { _id: ids.reviews[1], comment: "Great location.", rating: 4, author: ids.users[2] },
  { _id: ids.reviews[2], comment: "Average experience.", rating: 3, author: ids.users[4] },
  { _id: ids.reviews[3], comment: "Host was super helpful.", rating: 5, author: ids.users[0] },
  { _id: ids.reviews[4], comment: "Photos looked better.", rating: 2, author: ids.users[6] },
  { _id: ids.reviews[5], comment: "Solid value and comfy bed.", rating: 4, author: ids.users[3] },
  { _id: ids.reviews[6], comment: "Amazing view!", rating: 5, author: ids.users[5] },
];

const listings = [
  { _id: ids.listings[0], title: "Cozy Mountain Cabin", description: "Rustic cabin with fireplace.", image:{url:"https://picsum.photos/id/1018/800/600", filename:"cabin-mountain.jpg"}, price:120, location:"Manali", country:"India", reviews:[ids.reviews[0]], owner:ids.users[0] },
  { _id: ids.listings[1], title: "Beachfront Bungalow", description:"Steps from the beach.", image:{url:"https://picsum.photos/id/1015/800/600", filename:"beach-bungalow.jpg"}, price:200, location:"Goa", country:"India", reviews:[ids.reviews[1]], owner:ids.users[1] },
  { _id: ids.listings[2], title: "Urban Loft", description:"Modern loft with skyline view.", image:{url:"https://picsum.photos/id/1025/800/600", filename:"urban-loft.jpg"}, price:150, location:"Bengaluru", country:"India", reviews:[ids.reviews[2]], owner:ids.users[2] },
  { _id: ids.listings[3], title: "Desert Dome Stay", description:"Geodesic dome under stars.", image:{url:"https://picsum.photos/id/1003/800/600", filename:"desert-dome.jpg"}, price:90, location:"Jaisalmer", country:"India", reviews:[ids.reviews[3]], owner:ids.users[3] },
  { _id: ids.listings[4], title: "Forest Treehouse", description:"Treehouse retreat.", image:{url:"https://picsum.photos/id/103/800/600", filename:"forest-treehouse.jpg"}, price:110, location:"Wayanad", country:"India", reviews:[ids.reviews[4]], owner:ids.users[4] },
  { _id: ids.listings[5], title: "Lakeview Cottage", description:"Charming cottage by lake.", image:{url:"https://picsum.photos/id/1043/800/600", filename:"lake-cottage.jpg"}, price:130, location:"Nainital", country:"India", reviews:[ids.reviews[5]], owner:ids.users[5] },
  { _id: ids.listings[6], title: "Tokyo Micro-Apartment", description:"Compact & stylish.", image:{url:"https://picsum.photos/id/1062/800/600", filename:"tokyo-micro.jpg"}, price:85, location:"Tokyo", country:"Japan", reviews:[ids.reviews[6]], owner:ids.users[6] },
];

async function seed() {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    await User.deleteMany({});
    await Review.deleteMany({});
    await Listing.deleteMany({});
    await User.insertMany(users);
    await Review.insertMany(reviews);
    await Listing.insertMany(listings);
    console.log("Seeded 7 users, 7 reviews, 7 listings into Atlas ✅");
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

seed();


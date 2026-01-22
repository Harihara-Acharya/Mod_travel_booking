const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/Listing.js");

const db_url ="mongodb://127.0.0.1:27017/wonderlust";
async function main() {
      await mongoose.connect(db_url);
}

main().then(()=>{console.log("connected to database")})
      .catch((error)=>{console.log(error)});

const initdbs = async ()=>{
      await Listing.deleteMany({});
      initdata.data =initdata.data.map((obj)=>({...obj,owner:"686163572fc50aa19073f182"}));
      await Listing.insertMany(initdata.data);

      console.log("data was initilized");
}

initdbs();
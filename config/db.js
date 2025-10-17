
const mongoose = require("mongoose");
//mongoose chef do rchestere y nathdem fleux mabin base de donnes mongodb et server exprees

// Connect to MongoDB
module.exports.connectToMongoDB = async () => {
  mongoose.set("strictQuery", false);
  
  mongoose.connect(process.env.url_mongodb)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
};

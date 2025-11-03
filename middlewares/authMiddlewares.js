// lhna bach na3mel verficatio est ce que el user mhma can 3ando token n verifier w na3mel decodage ll token w yvaldi ou non w yt7akek min date d expiration 3ibara hadh 3ases mta3 les padge t7ebb takel wala td5ol lhan 3dek padge est ce que mzal el date mta3o
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema"); // 3alch jbet use model bach n5ali el backen ta3rfo el chkon el connecti chnwa el id w el role mta3o
const requireAuthUser = async (req, res, next) => {
  //const token = req.headers.authorization?.split(" ")[1]; //frontend
  const token = req.cookies.jwt;
  console.log("Token from cookies helllo hello:", token);
  if (token) {
    //
    jwt.verify(token, "catch me if you can", async (err, decodedToken) => {
      if (err) {
        throw new Error("Unauthorized: Invalid token");
      } else {
        const user = await userModel.findById(decodedToken.id);
        if (user) {
          console.log("Authenticated user:", user);
          //  if (user.Ban == false) {
          // if (user.Status == true) {
          req.user = user;
          next();
          //  }
          //    res.status(403).json({ message: "Your account is not activated" });
          //   }
          //    res.status(403).json({ message: "Your account is banned" });
        } else {
          throw new Error("Unauthorized: User not found");
        }
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

module.exports = { requireAuthUser };
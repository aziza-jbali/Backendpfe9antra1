//UserController bach n7oto les function eli bach ntbakhom 3al model

const userModel = require("../models/userSchema");// first 7aja importation mta3 model

// Get all users , add user , delete user , update user

//2 Create a new user
// module.exports.createAdminprincipal = async (req, res) => {
//   try {
//     // logique
//     const { nom, prenom, email, password, adminCode } = req.body;
//     const role = "adminprincipal";
//     const newUser = new userModel({
//       nom,
//       prenom,
//       email,
//       password,
//       role,
//       adminCode,
//     });
//     await newUser.save();
//     res.status(201).json({ newUser, message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// -------------------- Create Admin Principal --------------------
module.exports.createAdminprincipal = async (req, res) => {
  try {
    const { nom, prenom, email, password, adminCode,  } = req.body;
    const role = "adminprincipal";

    const newUser = new userModel({
      nom,
      prenom,
      email,
      password,
      role,
      adminCode,
    });

    await newUser.save();

    res.status(201).json({
      newUser,
      message: "Admin principal created successfully",
    });

  } catch (error) {
    console.error(error); // يظهر كامل التفاصيل في الترمينال

    // Validation errors من Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: "Validation Error", errors: messages });
    }

    // Duplicate key error من MongoDB
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate field value entered",
        key: error.keyValue,
      });
    }

    // أي خطأ آخر
    res.status(500).json({
      message: "Server Error",
      error: error.message,
      stack: error.stack
    });
  }
};














// 1 get all user 


module.exports.getAllUsers = async (req, res) => {
  try {
    const Users = await userModel.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
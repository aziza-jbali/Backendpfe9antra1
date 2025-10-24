//UserController bach n7oto les functions eli bach ntbakhom 3al model

const userModel = require("../models/userSchema");// first 7aja importation mta3 model

// Get all users , add user , search user,delete user , update user



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


//---------------------Create agence---------------
module.exports.createagence = async (req, res) => {
  try {
    const { nom, prenom, email, password,   } = req.body;
    const role = "agence";

    const newUser = new userModel({
      nom,
      prenom,
      email,
      password,
      role,
    // vehicules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vehicules' }],
     // فارغ عند الإنشاء

    });

    await newUser.save();

    res.status(201).json({
      newUser,
      message: "agence created successfully",
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



//---------------------Create announceur---------------
module.exports.createannonceur = async (req, res) => {
  try {
    const { nom, prenom, email, password,   } = req.body;
    const role = "annonceur";

    const newUser = new userModel({
      nom,
      prenom,
      email,
      password,
      role,
      annonces:[]
    // vehicules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vehicules' }],
     // فارغ عند الإنشاء

    });

    await newUser.save();

    res.status(201).json({
      newUser,
      message: "agence created successfully",
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


//---------------------Create client---------------
module.exports.createclient = async (req, res) => {
  try {
    const { nom, prenom, email, password,   } = req.body;
    const role = "client";

    const newUser = new userModel({
      nom,
      prenom,
      email,
      password,
      role,
      annonces:[]
    // vehicules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vehicules' }],
     // فارغ عند الإنشاء

    });

    await newUser.save();

    res.status(201).json({
      newUser,
      message: "agence created successfully",
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
///// create users with image 

//------------------- إنشاء Admin Principal by image-------------------
module.exports.createAdminprincipalWithImg = async (req, res) => {
  try {
    const userData = { ...req.body };
    if (req.file) {
      userData.image = req.file.filename;
    }
    userData.role = "adminprincipal";

    const newUser = new userModel(userData);
    await newUser.save();

    res.status(201).json({ newUser, message: "Admin principal created successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: "Validation Error", errors: messages });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value entered", key: error.keyValue });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//------------------- إنشاء Agence by image -------------------
module.exports.createAgenceWithImg = async (req, res) => {
  try {
    const userData = { ...req.body };
    if (req.file) {
      userData.image= req.file.filename;
    }
    userData.role = "agence";
    userData.vehicules = [];

    const newUser = new userModel(userData);
    await newUser.save();

    res.status(201).json({ newUser, message: "Agence created successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: "Validation Error", errors: messages });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value entered", key: error.keyValue });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//------------------- إنشاء Annonceur by image -------------------
module.exports.createAnnonceurWithImg = async (req, res) => {
  try {
    const userData = { ...req.body };
    if (req.file) {
      userData.image = req.file.filename;
    }
    userData.role = "annonceur";
    userData.annonces = [];

    const newUser = new userModel(userData);
    await newUser.save();

    res.status(201).json({ newUser, message: "Annonceur created successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: "Validation Error", errors: messages });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value entered", key: error.keyValue });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//------------------- إنشاء Client by image-------------------
module.exports.createClientWithImg = async (req, res) => {
  try {
    const userData = { ...req.body };
    if (req.file) {
      userData.image = req.file.filename;
    }
    userData.role = "client";
    userData.annonces = [];

    const newUser = new userModel(userData);
    await newUser.save();

    res.status(201).json({ newUser, message: "Client created successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: "Validation Error", errors: messages });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value entered", key: error.keyValue });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
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







// 📌 Get all admins
module.exports.getAdmin = async (req, res) => {
  try {
    const users = await userModel.find({ role: "adminprincipal" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get all clients
module.exports.getClient = async (req, res) => {
  try {
    const users = await userModel.find({ role: "client" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get all annonceurs
module.exports.getAnnonceur = async (req, res) => {
  try {
    const users = await userModel.find({ role: "annonceur" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get all agences
module.exports.getAgence = async (req, res) => {
  try {
    const users = await userModel.find({ role: "agence" }).select("-password");//select -password mtafichich el password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// 📌 Get single user by ID
module.exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


//search user  by id email ou nom


// module.exports.searchUsers = async (req, res) => {
//   try {
//     const { query } = req.body; // نص البحث الذي يدخله المستخدم
//     if (!query) {
//       return res.status(400).json({ message: "Please provide a search query" });
//     }
// // chercher par email id ou nom
//     const users = await userModel.find({
//       $or: [
//         { nom: { $regex: query, $options: "i" } },
//         { email: { $regex: query, $options: "i" } },
//         { _id: query } // إذا أدخل المستخدم الـ ID كامل
//       ]
//     }).select("-password");

//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };
const mongoose = require("mongoose");

module.exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Please provide a search query" });
    }

    const searchConditions = [
      { nom: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } }
    ];

    // إضافة البحث بالـ _id فقط إذا كانت قيمة query صالحة
    if (mongoose.Types.ObjectId.isValid(query)) {
      searchConditions.push({ _id: query });
    }

    const users = await userModel.find({ $or: searchConditions }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



//delete user by id 
module.exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // التحقق من وجود المستخدم
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // حذف الصورة إذا موجودة
    if (user.image && user.image !== "default-user.png") {
      const fs = require("fs");
      const path = `public/images/${user.image}`;
      if (fs.existsSync(path)) fs.unlinkSync(path);
    }

    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// update user by id even he has image 
module.exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.file) {
      const fs = require("fs");
      if (user.image && user.image !== "default-user.png") {
        const oldPath = `public/images/${user.image}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.image = req.file.filename;
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

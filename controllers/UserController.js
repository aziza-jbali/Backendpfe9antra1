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
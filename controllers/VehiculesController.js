
const  Vehicule = require("../models/VehiculesSchema");// first 7aja importation mta3 model
const userModel = require("../models/userSchema")
// Get all users , add user , search user,delete user , update user
// add véhuciles by image and relited it with the agence

// exports.addVehicule = async (req, res) => {
//   try {
//     const agenceId = req.params.id; // أو req.user._id لو عندك auth
//     const data = req.body;

//     // إذا نرفع الصورة عبر multer
//     if (req.file) {
//       data.image = `/uploads/vehicules/${req.file.filename}`;
//     }

//     // نربط السيارة بوكالة معينة
//     data.idagencedevehicule = agenceId;

//     // إنشاء السيارة
//     const newVehicule = new Vehicule(data);
//     await newVehicule.save();

//     // نضيف الـ id تاع السيارة إلى جدول الوكالة
//     await User.findByIdAndUpdate(
//       agenceId,
//       { $push: { vehicules: newVehicule._id } },
//       { new: true }
//     );

//     res.status(201).json({
//       message: '🚗 Véhicule ajouté avec succès',
//       vehicule: newVehicule
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };





exports.addVehicule = async (req, res) => {
  try {
    const agenceId = req.params.id;
    const data = req.body;

    if (req.file) {
      data.image = `/uploads/vehicules/${req.file.filename}`;
    }

    data.idagencedevehicule = agenceId;

    const newVehicule = new  Vehicule(data);
    await newVehicule.save();

    await userModel.findByIdAndUpdate(
      agenceId,
      { $push: { vehicules: newVehicule._id } },
      { new: true }
    );

    res.status(201).json({
      message: "🚗 Véhicule ajouté avec succès",
      vehicule: newVehicule
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};













//get all Véhicules
exports.getVehicules = async (req, res) => {
  try {
    const vehicules = await  Vehicule.find();
    res.status(200).json(vehicules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};
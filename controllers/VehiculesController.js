
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





// exports.addVehicule = async (req, res) => {
//   try {
//     const agenceId = req.params.id;
//     const data = req.body;

//     if (req.file) {
//       data.image = `/uploads/vehicules/${req.file.filename}`;
//     }

//     data.idagencedevehicule = agenceId;

//     const newVehicule = new  Vehicule(data);
//     await newVehicule.save();

//     await userModel.findByIdAndUpdate(
//       agenceId,
//       { $push: { vehicules: newVehicule._id } },
//       { new: true }
//     );

//     res.status(201).json({
//       message: "🚗 Véhicule ajouté avec succès",
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

    // التأكد أن الوكالة موجودة
    const agence = await userModel.findById(agenceId);
    if (!agence) {
      return res.status(404).json({ message: "Agence not found" });
    }

    // التأكد أن الدور هو "agence"
    if (agence.role !== "agence") {
      return res.status(403).json({ message: "Seul les agences peuvent ajouter des véhicules" });
    }

    // إضافة الصورة إذا موجودة
    if (req.file) {
      data.image = `/uploads/vehicules/${req.file.filename}`;
    }

    data.idagencedevehicule = agenceId;

    // إنشاء السيارة
    const newVehicule = new Vehicule(data);
    await newVehicule.save();

    // إضافة السيارة للوكالة
    agence.vehicules.push(newVehicule._id);
    await agence.save();

    res.status(201).json({
      message: "🚗 Véhicule ajouté avec succès",
      vehicule: newVehicule
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/// delete véhicules and also from the agence 
// DELETE VEHICULE
exports.deleteVehicule = async (req, res) => {
  try {
    const vehiculeId = req.params.id;

    // 1. حذف الـ Vehicule من collection السيارات
    const deletedVehicule = await Vehicule.findByIdAndDelete(vehiculeId);
    if (!deletedVehicule) {
      return res.status(404).json({ message: "Vehicule not found" });
    }

    // 2. حذف الـ Vehicule من array الوكالة
    await userModel.updateOne(
       { _id: deletedVehicule.idagencedevehicule }, // استخدام الحقل الصحيح
  { $pull: { vehicules: vehiculeId } } 
    );

    res.status(200).json({ message: "Vehicule deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//update vehicules with image 
exports.updateVehicule = async (req, res) => {
  try {
    const vehiculeId = req.params.id; // id السيارة
    const data = req.body; // البيانات الجديدة

    // 1. التحقق أن السيارة موجودة
    const vehicule = await Vehicule.findById(vehiculeId);
    if (!vehicule) {
      return res.status(404).json({ message: "🚫 Véhicule not found" });
    }

    // 2. التحقق أن الوكالة المرتبطة موجودة
    const agence = await userModel.findById(vehicule.idagencedevehicule);
    if (!agence) {
      return res.status(404).json({ message: "🚫 Agence not found" });
    }

    // 3. التحقق أن الدور هو agence
    if (agence.role !== "agence") {
      return res.status(403).json({ message: "🚫 User is not an agence" });
    }

    // 4. إذا تم رفع صورة جديدة، نحفظ المسار
    if (req.file) {
      data.image = `/uploads/vehicules/${req.file.filename}`;
    }

    // 5. تحديث بيانات السيارة
    const updatedVehicule = await Vehicule.findByIdAndUpdate(
      vehiculeId,
      data,
      { new: true } // لإرجاع البيانات بعد التحديث
    );

    res.status(200).json({
      message: "✅ Véhicule updated successfully",
      vehicule: updatedVehicule
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// changer le statu par l admin
// ✅ admin فقط يمكنه تحديث statut (En attente / Approuvé / Rejeté)
exports.updateStatutByAdmin = async (req, res) => {
  try {
    const { id } = req.params; // id السيارة
    const { statut, adminId } = req.body; // id المشرف المرسل

    // 🔹 نتحقق أن المشرف موجود
    // const admin = await userModel.findById(adminId);
    // if (!admin) return res.status(404).json({ message: "Admin not found" });
    // if (admin.role !== "admin") {
    //   return res.status(403).json({ message: "Accès refusé. Pas autorisé." });
    // }

    // 🔹 نتحقق أن الحالة صحيحة (من enum)
    const allowedStatus = ["En attente", "Approuvé", "Rejeté"];
    if (!allowedStatus.includes(statut)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    // 🔹 نحدث السيارة
    const vehicule = await Vehicule.findByIdAndUpdate(
      id,
      { statut },
      { new: true }
    );

    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    res.status(200).json({
      message: "Statut mis à jour avec succès ✅",
      vehicule
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// ✅ الوكالة فقط يمكنها تحديث statusVehicule (diponible / indisponible)
exports.updateStatusVehiculeByAgence = async (req, res) => {
  try {
    const { id } = req.params; // id السيارة
    const { statusVehicule, agenceId } = req.body; // الحالة الجديدة و id الوكالة

    // 🔹 تحقق أن الحالة ضمن القيم المسموح بها
    const allowed = ["diponible", "indisponible"];
    if (!allowed.includes(statusVehicule)) {
      return res.status(400).json({ message: "Statut de disponibilité invalide" });
    }

    // 🔹 تحقق أن الوكالة موجودة (يمكن تفعيل لاحقًا)
    // const agence = await userModel.findById(agenceId);
    // if (!agence) return res.status(404).json({ message: "Agence non trouvée" });
    // if (agence.role !== "agence") {
    //   return res.status(403).json({ message: "Accès refusé. Pas autorisé." });
    // }

    // 🔹 تحقق أن السيارة فعلاً تابعة لهذه الوكالة (يمكن تفعيل لاحقًا)
    // const vehicule = await Vehicule.findOneAndUpdate(
    //   { _id: id, idagencedevehicule: agenceId },
    //   { statusVehicule },
    //   { new: true }
    // );

    // 🔹 تحديث السيارة مباشرة بدون تحقق (للتجربة الآن)
    const vehicule = await Vehicule.findByIdAndUpdate(
      id,
      { statusVehicule },
      { new: true }
    );

    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    res.status(200).json({
      message: "✅ Statut de disponibilité mis à jour avec succès",
      vehicule
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// ✅ جلب سيارة واحدة حسب ID
exports.getVehiculeById = async (req, res) => {
  try {
    const { id } = req.params; // نجيبو الـ ID من الرابط
    const vehicule = await Vehicule.findById(id);

    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }

    res.status(200).json(vehicule);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du véhicule", error });
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


const User = require("../models/userSchema");
const Annonce = require("../models/Annonceschema"); 


// get delete search update add annonces 
// add annonces by image 

exports.addAnnonce = async (req, res) => {
  try {
    const announcerId = req.params.id; // id المعلن من الرابط
    const data = req.body;

    // التأكد أن المستخدم موجود
    const announcer = await User.findById(announcerId);
    if (!announcer) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // التأكد أن الدور هو "announcer"
    if (announcer.role !== "annonceur") {
      return res.status(403).json({ message: "Seuls les annonceurs peuvent ajouter des annonces" });
    }

    // إضافة الصورة إذا موجودة
    if (req.file) {
      data.image = `/images/${req.file.filename}`;
    }

    // ربط الإعلان بالمعلن
    data.idannouncer = announcerId;

    // إنشاء الإعلان
    const newAnnonce = new Annonce(data);
    await newAnnonce.save();

    // (اختياري) لو حبيت تربط الإعلان داخل المعلن
    if (!announcer.annonces) announcer.annonces = [];
    announcer.annonces.push(newAnnonce._id);
    await announcer.save();

    res.status(201).json({
      message: "📢 Annonce ajoutée avec succès",
      annonce: newAnnonce
    });
  } catch (error) {
    console.error("❌ Erreur:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'annonce", error });
  }
};

exports.getAnnonceById = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id)
      .populate('idannouncer', 'nom email');
    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    res.status(200).json(annonce);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'annonce", error });
  }
};

// delete annonce by id
exports.deleteAnnonce = async (req, res) => {
  try {
    const annonceId = req.params.id;

    // 1. إيجاد وحذف الإعلان من collection annonces
    const deletedAnnonce = await Annonce.findByIdAndDelete(annonceId);
    if (!deletedAnnonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    // 2. حذف الإعلان من array annonces في المعلن
    await User.updateOne(
      { _id: deletedAnnonce.idannouncer }, // استخدام الحقل الصحيح
      { $pull: { annonces: annonceId } }   // إزالة الإعلان من المصفوفة
    );

    res.status(200).json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    console.error("❌ Erreur:", error);
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
};
//update annonce by id 

exports.updateAnnonce = async (req, res) => {
  try {
    const annonceId = req.params.id; // ID de l'annonce
    const data = req.body; // nouvelles données

    // 1️⃣ التحقق أن الإعلان موجود
    const annonce = await Annonce.findById(annonceId);
    if (!annonce) {
      return res.status(404).json({ message: "🚫 Annonce not found" });
    }

    // 2️⃣ التحقق أن المعلِن المرتبط موجود
    const announcer = await User.findById(annonce.idannouncer);
    if (!announcer) {
      return res.status(404).json({ message: "🚫 Announcer not found" });
    }

    // 3️⃣ التحقق أن الدور هو معلِن (announcer)
    if (announcer.role !== "annonceur") {
      return res.status(403).json({ message: "🚫 User is not an announcer" });
    }

    // 4️⃣ إذا تم رفع صورة جديدة
    if (req.file) {
      data.image = `/uploads/annonces/${req.file.filename}`;
    }

    // 5️⃣ تحديث بيانات الإعلان
    const updatedAnnonce = await Annonce.findByIdAndUpdate(annonceId, data, {
      new: true, // لإرجاع البيانات بعد التحديث
    });

    res.status(200).json({
      message: "✅ Annonce updated successfully",
      annonce: updatedAnnonce,
    });
  } catch (error) {
    console.error("❌ Error updating annonce:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// update the statue
exports.updateStatutByAnnonceur = async (req, res) => {
  try {
    const { id } = req.params; // 🆔 رقم الإعلان
    const { statut, annonceurId } = req.body; // id المعلن المرسل

    // 🔹 التحقق أن المعلن موجود
    // const annonceur = await User.findById(annonceurId);
    // if (!annonceur) return res.status(404).json({ message: "Annonceur non trouvé" });

    // if (annonceur.role !== "annonceur") {
    //   return res.status(403).json({ message: "🚫 المستخدم ليس معلنًا" });
    // }

    // 🔹 التحقق أن الحالة صحيحة
    const allowedStatus = ["En attente", "Approuvé", "Rejeté"];
    if (!allowedStatus.includes(statut)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    // 🔹 تحديث الإعلان مع التأكد أنه تابع لهذا المعلن
    const annonce = await Annonce.findOneAndUpdate(
      { _id: id, idannouncer: annonceurId },
      { statut },
      { new: true }
    );

    if (!annonce) {
      return res.status(404).json({ message: "Annonce introuvable ou pas autorisé" });
    }

    res.status(200).json({
      message: "Statut de l'annonce mis à jour avec succès ✅",
      annonce
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get annonce with the details of annonceur
exports.getAnnoncesOfAnnonceur = async (req, res) => {
  try {
    const { annonceurId } = req.params;

    const annonceur = await User.findById(annonceurId)
      .select("nom prenom email role image")
      .populate({
        path: "annonces",          // الحقل array في User
        select: "description statut image datePublication"
      });

    if (!annonceur) {
      return res.status(404).json({ message: "Annonceur non trouvé" });
    }

    res.status(200).json({
      message: "✅ Annonces récupérées avec succès",
      annonceur
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










//get all annonces
exports.getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces', error });
  }
};


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
      data.image = `/uploads/annonces/${req.file.filename}`;
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



//get all annonces
exports.getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces', error });
  }
};
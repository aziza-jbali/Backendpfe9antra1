const mongoose = require('mongoose');

const vehiculeSchema = new mongoose.Schema({
  idagencedevehicule: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // لأنه agence هو مستخدم عنده role: 'agence'
    required: true 
  },

  nom: { type: String, required: true, trim: true },
  carburant: { type: String, required: true, trim: true },
  modele: { type: String, required: true, trim: true },
  kilometrage: { type: Number, required: true },
  annee: { type: Number, required: true },
  sieges: { type: Number, required: true },
  categorie: { type: String, trim: true },
  transmission: { type: String, trim: true },
  description: { type: String, trim: true },

  // ✅ خصائص Boolean خاصة بذوي الاحتياجات الخاصة
  rampe: { type: Boolean, default: false }, // ramp = true إذا فيها منحدر
  elevator: { type: Boolean, default: false },
  commandeManuelle: { type: Boolean, default: false },
  guide: { type: Boolean, default: false },

  // ✅ تجهيزات إضافية
  espaceFauteuil: { type: String, trim: true },
  support: { type: String, trim: true },

  // ✅ الصورة
  image: { type: String, default: 'default-vehicule.jpg' },

  // ✅ الحالة (en attente / approuvé / rejeté)
  statut: { 
    type: String, 
    enum: ['En attente', 'Approuvé', 'Rejeté'], 
    default: 'En attente' 
  },

  // ✅ disponibilité (disponible ou non)
  statusVehicule: { 
    type: String, 
    enum: ['diponible', 'indisponible'], 
    default: 'diponible' 
  },

  // ✅ السعر
  prixParJour: { type: Number, required: true },

  // ✅ Chauffeur موجود أو لا
  avecChauffeur: { type: Boolean, default: false },

  // ✅ تاريخ الإضافة
  dateAjout: { type: Date, default: Date.now },
    // ✅ 🔗 العلاقة مع الـ Reservations
  reservations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation'
  }]

}, { timestamps: true });

//const Vehicule = mongoose.model('Vehicule', vehiculeSchema);MongoDB تلقائيًا تعمل collection اسمها vehicules (تحوّل الاسم إلى lowercase وتجمعه).

// لكن لو تحب تتحكم بنفسك، تنجم تحددها هكا:

 const Vehicule =mongoose.model('Vehicule', vehiculeSchema, 'vehicules');

module.exports = Vehicule;

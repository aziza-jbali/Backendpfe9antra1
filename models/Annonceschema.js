const mongoose = require('mongoose');

const AnnonceSchema = new mongoose.Schema({
 
  idannouncer: {
    type: mongoose.Schema.Types.ObjectId, // رابط لمعلِن (User مثلاً)
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  statut: { 
    type: String, 
    enum: ['En attente', 'Approuvé', 'Rejeté'], 
    default: 'En attente' 
  },
    image: {            // حقل الصورة
    type: String,
    default: null     // يمكن أن يكون فارغ إذا لم يتم رفع صورة
  },
  datePublication: {
    type: Date,
    default: Date.now
  }
});

const Annonce = mongoose.model('Annonce', AnnonceSchema, 'annonces'); // 👈 أضف الاسم الحقيقي للـ collection

module.exports = Annonce;
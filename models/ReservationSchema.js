const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  // 🔗 العلاقة مع العميل (client)
  idClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // client هو مستخدم
    required: true
  },

  // 🔗 العلاقة مع السيارة (vehicule)
  idVehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicule',
    required: true
  },

  // ✅ تاريخ البداية والنهاية
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },

  // ✅ المدة بالأيام (تتحسب تلقائياً)
  duree: {
    type: Number
  },

  // ✅ المبلغ الكلي للحجز
  totalPrix: {
    type: Number,
    required: true
  },

  // ✅ تاريخ الإنشاء
  dateReservation: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

// 🧮 حساب المدة تلقائياً قبل الحفظ
reservationSchema.pre('save', function(next) {
  if (this.dateDebut && this.dateFin) {
    const diffTime = Math.abs(this.dateFin - this.dateDebut);
    this.duree = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // عدد الأيام
  }
  next();
});

const Reservation = mongoose.model('Reservation', reservationSchema, 'reservations');

module.exports = Reservation;

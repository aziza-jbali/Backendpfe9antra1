const Reservation = require("../models/ReservationSchema");
const Vehicule = require("../models/VehiculesSchema");
const User = require("../models/userSchema");

exports.ajouterReservation = async (req, res) => {
  try {
    const { idClient, idVehicule, dateDebut, dateFin } = req.body;

    // ✅ التحقق من أن العميل والسيارة موجودين
    const client = await User.findById(idClient);
    if (!client || client.role !== "client") {
      return res.status(404).json({ message: "Client introuvable ou non autorisé" });
    }

    const vehicule = await Vehicule.findById(idVehicule);
    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    // ✅ التحقق من توفر السيارة
    if (vehicule.statusVehicule === "indisponible") {
      return res.status(400).json({ message: "Ce véhicule est déjà réservé" });
    }

    // ✅ حساب المدة بالأيام والمبلغ الكلي
    const diffTime = Math.abs(new Date(dateFin) - new Date(dateDebut));
    const duree = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrix = duree * vehicule.prixParJour;

    // ✅ إنشاء الحجز
    const newReservation = new Reservation({
      idClient,
      idVehicule,
      dateDebut,
      dateFin,
      duree,
      totalPrix
    });

    await newReservation.save();

    // ✅ إضافة الحجز إلى العميل
    await User.findByIdAndUpdate(idClient, {
      $push: { reservations: newReservation._id }
    });

    // ✅ إضافة الحجز إلى السيارة + تغيير حالتها إلى غير متاحة
    await Vehicule.findByIdAndUpdate(idVehicule, {
      $push: { reservations: newReservation._id },
      // statusVehicule: "indisponible"
    });

    res.status(201).json({
      message: "✅ Réservation ajoutée avec succès",
      reservation: newReservation
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get all reservation 

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      // نجيب بيانات العميل المهمة
      .populate({
        path: 'idClient',
        select: 'nom prenom email phones role', // نجيب فقط الحقول المهمة
        match: { role: 'client' } // نتاكد انو role = client
      })
      // نجيب بيانات السيارة المهمة
      .populate({
        path: 'idVehicule',
        select: 'nom modele carburant image prixParJour statusVehicule rampe elevator commandeManuelle guide',
      });

    res.status(200).json({
      message: "✅ Liste des réservations récupérée avec succès",
      reservations
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
const express = require("express");
const router = express.Router();
const ReservationController=require("../controllers/ReservationController")
//ajout reservation
router.post("/ajouterReservation", ReservationController.ajouterReservation);
router.get('/getallreservation', ReservationController.getAllReservations);

module.exports = router;

var express = require('express');
var router = express.Router();
const AnnonceController=require("../controllers/AnnonceController")
const uploadfile = require('../middlewares/uploadfile');

// the endpoint of add annonce by image 
router.post("/addAnnonce/:id", uploadfile.single("image"), AnnonceController.addAnnonce);
//get all Annonces
router.get('/getAllAnnonces', AnnonceController.getAnnonces);
// get annonce by id
router.get('/getoneannonce/:id', AnnonceController.getAnnonceById);
// delete by id 
router.delete('/deleteannonce/:id', AnnonceController.deleteAnnonce);
// update annonce by id 
router.put(
  "/updateAnnonce/:id",
  uploadfile.single("image"), // تحميل صورة جديدة إن وجدت
  AnnonceController.updateAnnonce
);
// update statut
router.put(
  "/updateStatut/:id",
  AnnonceController.updateStatutByAnnonceur
);
// get all the annonces with the details of annonceur 
router.get("/annonceur/:annonceurId/annonces", AnnonceController.getAnnoncesOfAnnonceur);


module.exports = router;

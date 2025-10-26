var express = require('express');
var router = express.Router();
const AnnonceController=require("../controllers/AnnonceController")
const uploadfile = require('../middlewares/uploadfile');
router.get('/getAllAnnonces', AnnonceController.getAnnonces);

module.exports = router;

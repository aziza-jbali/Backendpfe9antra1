var express = require('express');
var router = express.Router();
const VehiculesController=require("../controllers/VehiculesController")
const uploadfile = require('../middlewares/uploadfile');

//add vehicule by image and relited it by its agence 
//fi login tst7akha
router.post('/addVehicule/:id', uploadfile.single('image'),VehiculesController.addVehicule);

// add without login
// router.post('/addVehicule', uploadfile.single('image'), VehiculesController.addVehicule);

//get all véhicules

router.get('/getVehicules', VehiculesController.getVehicules);

//get vehicule by id
router.get("/getvehiculesbyid/:id", VehiculesController.getVehiculeById);
// get vehicule with details agence

router.get('/getvehiculeswithagence', VehiculesController.getvehiculeswithagence);


// delete vehicule by id and from its agence 
router.delete("/deleteVehicules/:id",VehiculesController.deleteVehicule);

// update even with image 

router.put(
  "/updateVehicules/:id",       // :id هو id السيارة
  uploadfile.single("image"), // إذا فيه صورة جديدة
  VehiculesController.updateVehicule
);
//update the statu by admin



router.put("/update-statutadminprincipal/:id", VehiculesController.updateStatutByAdmin);

//update the statu by agence
router.put("/update-statusagence/:id", VehiculesController.updateStatusVehiculeByAgence);





//getVehicules
module.exports = router;
// 1️⃣ معنى module.exports في Node.js

// كل ملف في Node.js يعتبر module.

// لو تحب تخلي ملف يعطي حاجة للملفات الأخرى، تستعمل module.exports.

// أي حاجة تحطها في module.exports، الملف الثاني يقدر يستعملها بـ require.

// مثال:
var express = require('express');
var router = express.Router();
const VehiculesController=require("../controllers/VehiculesController")
const uploadfile = require('../middlewares/uploadfile');

//add vehicule by image and relited it by its agence 
router.post('/addVehicule/:id', uploadfile.single('image'),VehiculesController.addVehicule);



//get all véhicules

router.get('/getVehicules', VehiculesController.getVehicules);






// delete vehicule by id and from its agence 
router.delete("/deleteVehicules/:id",VehiculesController.deleteVehicule);

// update even with image 

router.put(
  "/updateVehicules/:id",       // :id هو id السيارة
  uploadfile.single("image"), // إذا فيه صورة جديدة
  VehiculesController.updateVehicule
);




//getVehicules
module.exports = router;
// 1️⃣ معنى module.exports في Node.js

// كل ملف في Node.js يعتبر module.

// لو تحب تخلي ملف يعطي حاجة للملفات الأخرى، تستعمل module.exports.

// أي حاجة تحطها في module.exports، الملف الثاني يقدر يستعملها بـ require.

// مثال:
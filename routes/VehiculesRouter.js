var express = require('express');
var router = express.Router();
const VehiculesController=require("../controllers/VehiculesController")
const uploadfile = require('../middlewares/uploadfile');





//get all véhicules

router.get('/getVehicules', VehiculesController.getVehicules);

//getVehicules
module.exports = router;
// 1️⃣ معنى module.exports في Node.js

// كل ملف في Node.js يعتبر module.

// لو تحب تخلي ملف يعطي حاجة للملفات الأخرى، تستعمل module.exports.

// أي حاجة تحطها في module.exports، الملف الثاني يقدر يستعملها بـ require.

// مثال:
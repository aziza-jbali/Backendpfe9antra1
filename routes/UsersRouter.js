var express = require('express');
var router = express.Router();
const UserController=require("../controllers/UserController")
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/createAdmin', UserController.createAdminprincipal);
router.get('/getAllUsers', UserController.getAllUsers);
router.post('/createagence', UserController.createagence);


//createagence 
//fi routage 3ndna 4 protocol get delete put post

 
module.exports = router;

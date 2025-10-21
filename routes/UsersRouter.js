var express = require('express');
var router = express.Router();
const UserController=require("../controllers/UserController")
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
////create users
router.post('/createAdmin', UserController.createAdminprincipal);
router.post('/createagence', UserController.createagence);
router.post('/createannonceur', UserController.createannonceur);
router.post('/createclient', UserController.createclient);
//////////get users 
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getAdmins', UserController.getAdmin);
router.get('/getClients', UserController.getClient);
router.get('/getAnnonceurs', UserController.getAnnonceur);
router.get('/getAgences', UserController.getAgence);
router.get('/getUserById/:id', UserController.getUserById);


//createagence createannonceur createclient
//fi routage 3ndna 4 protocol get delete put post

 
module.exports = router;

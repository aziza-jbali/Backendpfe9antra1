var express = require('express');
var router = express.Router();
const UserController=require("../controllers/UserController")
const uploadfile = require('../middlewares/uploadfile');
const {}=require("../middlewares/authMiddlewares") // n7athou fi les route eli tst7ak authentification
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// //router.use(requireAuthUser); si t7eeb t7ot el middle ware fi el route el kol

////create users
router.post('/createAdmin', UserController.createAdminprincipal);
router.post('/createagence', UserController.createagence);
router.post('/createannonceur', UserController.createannonceur);
router.post('/createclient', UserController.createclient);
//// create users by images 

router.post('/createClientWithImg', uploadfile.single('image'), UserController.createClientWithImg);
router.post('/createAgenceWithImg', uploadfile.single('image'), UserController.createAgenceWithImg);
router.post('/createAnnonceurWithImg', uploadfile.single('image'), UserController.createAnnonceurWithImg);
router.post('/createAdminWithImg', uploadfile.single('image'), UserController.createAdminprincipalWithImg);

//////////get users 
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getAdmins', UserController.getAdmin);
router.get('/getClients', UserController.getClient);
router.get('/getAnnonceurs', UserController.getAnnonceur);
router.get('/getAgences', UserController.getAgence);
router.get('/getUserById/:id', UserController.getUserById);
//search users




//searchUsers 
router.get('/searchUsers', UserController.searchUsers);
// delete user by id 

router.delete('/deleteUserById/:id', UserController.deleteUserById);
//update user by id even he has image 

router.put("/updateUserById/:id", uploadfile.single("image"), UserController.updateUserById );




//fi routage 3ndna 4 protocol get delete put post

 // tow endpoint of login post 3la 5ater 3dit data email and password
router.post('/login', UserController.login);//login user
router.get('/logout', UserController.logout);//logout 


module.exports = router;

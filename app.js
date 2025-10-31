var createError = require('http-errors');//
var express = require('express');//imprtation mta3 el mo5
var path = require('path');
var cookieParser = require('cookie-parser');//el site mta3ik ysajel 7ajet 3lik
var logger = require('morgan');
var cors = require('cors'); // ✅ أضف هذا السطر

// madem fas5na 7ajet lazem nsal7o fi app.js 
//+zdna hadha
const http=require("http")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UsersRouter.js');
var VehiculesRouter=require('./routes/VehiculesRouter.js')
var ReservationRouter=require('./routes/ReservationRouter.js')
var AnnoncesRouter=require('./routes/AnnonceRouter.js')
//7mlna instance mt3 express express server 7adher bach noredh mino kol chy bach njem nsna3 el server mta3i
//app how mo5 ey 7aja lazem nrboth bl app.js bach ttkra aka el 7aja mil app wala erbot 7aja marbota bl app.js
require("dotenv").config();
const {connectToMongoDB}=require("./config/db.js");//importation
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));// ya express esta3mel hadha
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//dosssier static tkolo rak bach tsta3mlo makench myfikich
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// lhna 3ibra 3la guichet wala map t7eeb tmichi page user 3lik bl path hadha
app.use('/', indexRouter);
app.use('/users', usersRouter);// we relaited all router of user with the brain app.js
app.use('/Vehicules', VehiculesRouter)
app.use('/Reservation',ReservationRouter )
app.use('/Annonces',AnnoncesRouter )


// catch 404 and forward to error handler
//hadha mta3 el error 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});
//res.render('error'); res.json
module.exports = app;
const server=http.createServer(app);
server.listen(process.env.Port,()=>{
  console.log("server is runing on port 5011");
  connectToMongoDB();

})
//Ce code crée un serveur Node.js basé sur une application Express (app).
//Il commence à écouter les requêtes sur le port 3010,
//et lorsqu’il démarre avec succès, il affiche dans la console :

//"server is running on port 3010"


// Mugprt4syrbWYoAI
// mongodb+srv://<azizajbali5n_db_user>:<Mugprt4syrbWYoAI>@cluster0.cbtdjol.mongodb.net/
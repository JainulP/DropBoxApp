var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var index = require('./routes/index');
var users = require('./routes/users');
// var passport = require('passport');
var expressSessions = require("express-session");
var app = express();
const del = require('del');
var mysql = require('./routes/mysql');

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');
console.log(new Date(dt.now()));

// app.delete('/deleteIt', function (req,res) {
//     del(['./public/uploads/'+req.query.fileName]).then(paths => {
//         console.log('Deleted files and folders:\n', paths.join('\n'));
//         console.log("No error");
//
//         var deletefile = "delete from userfiles where filedirectorypath = 'public/uploads/"+req.query.fileName+ "';";
//         console.log("deletefile"+ deletefile);
//         mysql.putData(function(err,results){
//             if(err){
//                 throw err;
//             }
//             else
//             {
//                 if(results.length > 0){
//                     console.log(JSON.stringify(results));
//                     var putUserLifeEvent = "Insert into UserLifeEvents(UserName,events,eventtime) values('"+currentUser+"','"+ currentUser+ "  deleted "+req.query.fileName+"." +"','"+ Date(dt.now())+"');";
//                     console.log("putUserLifeEvent"+ putUserLifeEvent);
//                     mysql.putData(function(err,results){
//                         if(err){
//                             throw err;
//                         }
//                         else
//                         {
//                             if(results.length > 0){
//                                 console.log(JSON.stringify(results));
//                                 res.send("Success");
//                             }
//                         }
//                     },putUserLifeEvent);
//                     res.send("Success");
//                 }
//             }
//         },deletefile);
//
//
//
//     });
//     res.status(204).end();
// });


//Enable CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    // store: new mongoStore({
    //     url: mongoSessionURL
    // })
}));
// app.use(passport.initialize());

app.use('/', index);
app.use('/users', users);

app.use('./public/uploads', express.static(path.join(__dirname, 'uploads')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use('./public/uploads', express.static(path.join(__dirname, 'uploads')));


// app.post('/logout', function(req,res) {
//     console.log(req.session.user);
//     req.session.destroy();
//     console.log('Session Destroyed');
//     res.status(200).send();
// });
//
// app.post('/login', function(req, res, next) {
//     passport.authenticate('login', function(err, user, info) {
//         if(err) {
//             return next(err);
//         }
//
//         if(!user) {
//             res.status(401).send();
//         }
//
//         req.logIn(user, {session:false}, function(err) {
//             if(err) {
//                 return next(err);
//             }
//
//             req.session.user = user.username;
//             console.log(req.session.user);
//             console.log("session initilized")
//             return res.status(201).send();
//         })
//     })(req, res, next);
// });



// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});


module.exports = app;

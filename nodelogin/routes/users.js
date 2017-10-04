var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var users = [
    {
        username: "Mike",
        password: "mike123"
    },
    {
        username: "Tom",
        password: "tom123"
    },
    {
        username: "John",
        password: "john123"
    },
    {
        username: "Mac",
        password: "mac123"
    }
];


/* GET users listing. */


router.get('/check',function (req,res) {
    res.send("Session"+req.session.username);
});
router.get('/',function (req,res) {
    req.session.username = "Jainul";
    res.send("Session"+req.session.username);
});

router.post('/doLogin', function (req, res, next) {

    var username, password;
    username = req.param("username");
    password = req.param("password");
    console.log(username+" "+password);
    req.session.username = username;
    console.log("Session initialized");
    //req.session.userss = "hello";
    //console.log("hello"+JSON.stringify(req.session));
    var getUsers = "select * from UserData where UserName = '"+req.body.username+"'";
    console.log("getAllUsers"+ getUsers);
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                console.log(JSON.stringify(results));
                res.send("Success");
            }
        }
    },getUsers);
console.log("after  ",req.session.username);
    //req.session.

});
router.post('/doSignUp', function (req, res, next) {
    console.log("session username: "+ req.session.username);
     var putUser = "Insert into UserData(UserName,firstname,lastname,password) values('"+req.body.email+"','"+req.body.firstname+"','"+ req.body.lastname +"','"+ req.body.password + "');";
    console.log("putuser"+ putUser);
    mysql.putData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                console.log(JSON.stringify(results));
                res.send("Success");
            }
        }
    },putUser);


});
module.exports = router;

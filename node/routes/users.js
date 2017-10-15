var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var mysql = require('./mysql');
var mkdirp = require('mkdirp');
const del = require('del');
var currentUser;
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');
console.log(new Date(dt.now()));
var shared = [];

// var users = [
//     {
//         username: "Mike",
//         password: "mike123"
//     },
//     {
//         username: "Tom",
//         password: "tom123"
//     },
//     {
//         username: "John",
//         password: "john123"
//     },
//     {
//         username: "Mac",
//         password: "mac123"
//     }
// ];


/* GET users listing. */


// router.get('/check',function (req,res) {
//     //res.send("Session"+req.session.username);
// });
router.get('/',function (req,res) {
   // req.session.username = "Jainul";
    //res.send("Session"+req.session.username);
});

router.post('/doLogin', function (req, res, next) {

    var username, password;
    username = req.param("username");
    password = req.param("password");
    console.log(username+" "+password);
    req.session.username = username;
    console.log("Session initialized");
    //req.session.userss = "hello";
    console.log(req.session.username);
    var getUsers = "select * from UserData where UserName = '"+req.body.username+"' and Password = '" + req.body.password + "';";
    console.log("getAllUsers"+ getUsers);
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                console.log(JSON.stringify(results));
                return res.status(201).send();
            }
        }
    },getUsers);
//console.log("after  ",req.session.username);
    //req.session.

});
router.post('/doSignUp', function (req, res, next) {
   // console.log("session username: "+ req.session.username);
     var putUser = "Insert into UserData(UserName,firstname,lastname,password) values('"+req.body.email+"','"+req.body.firstname+"','"+ req.body.lastname +"','"+ req.body.password + "');";
    console.log("putuser"+ putUser);
    mysql.putData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            return res.status(201).send();
        }
    },putUser);


});

router.get('/logout', function(req,res) {
    console.log(currentUser);
    console.log(req.session.username);
    req.session.destroy();
    console.log('Session Destroyed');
    console.log(currentUser);
    res.status(200).send();
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname)
    }
});

var upload = multer({storage:storage});

/* GET files listing. */
router.get('/files', function (req, res, next) {
    //var resArr = [];

    // glob("public/uploads/*", function (er, files) {
    //
    //     var resArr = files.map(function (file) {
    //         var fileJSON = {};
    //         fileJSON.filename = file.split('/')[2];
    //         fileJSON.filepath = file;
    //         fileJSON.cols = 2  ;
    //         return fileJSON;
    //     });
    //
    //     console.log(resArr);
    //     res.status(200).send(resArr);
    // });

    var resArr = [];
    var getallfiles = "select distinct filedirectorypath,isDirectory,isStarred from userfiles where username = '"+ currentUser+"'";
    console.log("getallfiles"+ getallfiles);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else {
            //console.log("db res:"+ results);
            if (results.length > 0) {
                console.log(JSON.stringify(results));

                for (var i = 0; i < results.length; i++) {

                    var fileJSON = {};
                    var resJSON = JSON.stringify(results[i]);
                    fileJSON.filename = JSON.parse(resJSON)["filedirectorypath"].split('/')[2];
                    fileJSON.filename1 = JSON.parse(resJSON)["filedirectorypath"].split('/')[3];
                    if(fileJSON.filename1 == undefined) {
                        fileJSON.filepath = JSON.parse(resJSON)["filedirectorypath"];
                        fileJSON.isDir = JSON.parse(resJSON)["isDirectory"];
                        fileJSON.isStarred = JSON.parse(resJSON)["isStarred"];
                        fileJSON.cols = 2;

                        resArr.push(fileJSON);
                    }
                }

                return res.status(200).send(JSON.stringify(resArr));

            }
        }

    },getallfiles);
});


router.get('/sharedfiles', function (req, res,next) {

    var resArr = [];
    var getsharedfiles = "select * from userfiles where sharedwith = 'yogesh.chauhan@gmail.com'";
    console.log("getsharedfiles"+ getsharedfiles);

    mysql.fetchData(function(err,results){
        if(err){
            console.log("SDhasted erro" +err);
            throw err;
        }
        else {
            if (results.length > 0) {
                 console.log("results of shared file"+JSON.stringify(results));

                for (var i = 0; i < results.length; i++) {

                    var fileJSON = {};
                    var resJSON = JSON.stringify(results[i]);
                    fileJSON.filename = "S"+JSON.parse(resJSON)["filedirectorypath"].split('/')[2];
                    fileJSON.filename1 = JSON.parse(resJSON)["filedirectorypath"].split('/')[3];
                    console.log("filename1", fileJSON.filename1);
                    if(fileJSON.filename1 == undefined) {
                        fileJSON.filepath = JSON.parse(resJSON)["filedirectorypath"];
                        fileJSON.isDir = JSON.parse(resJSON)["isDirectory"];
                        fileJSON.isStarred = JSON.parse(resJSON)["isStarred"];
                        fileJSON.cols = 2;

                        resArr.push(fileJSON);
                    }

                }

                return res.status(200).send(JSON.stringify(resArr));

            }
        }

    },getsharedfiles);


});



router.post('/upload', upload.single('mypic'), function (req, res, next) {
    console.log(req.file);
    var putuserfiledata = "Insert into userfiles(username,filedirectorypath,isDirectory,isStarred) values('"+currentUser+"','" +req.file.path+"', 'false', 'false" + "');";
    console.log("putuserfiledata"+ putuserfiledata);
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
    },putuserfiledata);
    var putUserLifeEvent = "Insert into UserLifeEvents(UserName,events,eventtime) values('"+currentUser+"','"+ currentUser+ "  uploaded "+req.file.originalname+" file." +"','"+ Date(dt.now())+ "');";
    console.log("putUserLifeEvent"+ putUserLifeEvent);
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
    },putUserLifeEvent);
    res.status(204).end();
});

router.post('/uploadUnderDir', function (req, res, next) {
    console.log(req.query.dirPath);
    console.log("file Uploaded*********");
    // console.log(req.file);
var filename;
    var storageInDir = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, req.query.dirPath)
        },
        filename: function (req, file, cb) {
            filename = file.originalname;
            cb(null, file.originalname)
        }
    });

    var uploadInDir = multer({storage:storageInDir}).single('mypic');
    uploadInDir(req,res,function (err) {
        if(err){console.log(err);}
        else
        {
            var putuserfiledata = "Insert into userfiles(username,filedirectorypath,isDirectory,isStarred) values('"+currentUser+"','" +req.file.path+"', 'false', 'false" + "');";
            console.log("putuserfiledata"+ putuserfiledata);
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
            },putuserfiledata);
                console.log("No error");
                var putUserLifeEvent = "Insert into UserLifeEvents(UserName,events,eventtime) values('"+currentUser+"','"+ currentUser+ "  uploaded "+filename+" file." +"','"+ Date(dt.now())+ "');";
                console.log("putUserLifeEvent"+ putUserLifeEvent);
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
                },putUserLifeEvent);
                res.status(204).end();

        }
    });
    res.status(204).end();
});

router.post('/makedir', function (req,res) {
    console.log("Directory name"+req.body.dirName);
    mkdirp('./public/uploads/'+req.body.dirName , function (err) {
        if(!err) {
            console.log("No error");
            var putuserfiledata = "Insert into userfiles(username,filedirectorypath,isDirectory,isStarred) values('"+currentUser+"','" +"public/uploads/"+req.body.dirName+"','" + req.body.isDir + "', 'false'"+ "');";
            console.log("putuserfiledata"+ putuserfiledata);
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
            },putuserfiledata);
            var putUserLifeEvent = "Insert into UserLifeEvents(UserName,events,eventtime) values('" + currentUser + "','" + currentUser + "  created " + req.body.dirName + " directory." + "','" + Date(dt.now()) + "');";
            console.log("putUserLifeEvent" + putUserLifeEvent);
            mysql.putData(function (err, results) {
                if (err) {
                    throw err;
                }
                else {
                    if (results.length > 0) {
                        console.log(JSON.stringify(results));
                        res.send("Success");
                    }
                }
            }, putUserLifeEvent);
            res.status(204).end();
        }
    });
     res.status(204).end();

});


router.post('/shareDirectory', function (req, res, next) {
    console.log("In shared directory"+req.body.shareDirectoryPath);
    console.log("shared file with"+req.body.shareWith);
    var arraySharedWith = req.body.shareWith.split(",");
    for(var index =0; index < arraySharedWith.length; index++)
    {
        var shareDirectory = "Insert into userfiles(username,filedirectorypath,isDirectory,sharedwith) values('"+currentUser + "','" + req.body.shareDirectoryPath+ "','"+ req.body.isDir + "','" + arraySharedWith[index]+ "');";
        //var putsharedDirectory = "Insert into shareddata(sharedwith,fileowner,path) values('"+req.body.shareWith+"','"+"jainul.patel"+"','"+ req.body.shareDirectoryPath + "');";
        console.log("shareDirectory"+ shareDirectory);
        mysql.putData(function(err,results){
            if(err){
                throw err;
            }
            else
            {

                console.log(JSON.stringify(results));
                //res.send("Success");
                res.status(204).end();
            }
        },shareDirectory);
    }


});


router.post('/deleteIt', function (req,res) {
    del(['./public/uploads/'+req.query.fileName]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        console.log("No error");

        var deletefile = "delete from userfiles where filedirectorypath = 'public/uploads/"+req.query.fileName+ "';";
        console.log("deletefile"+ deletefile);
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
        },deletefile);

        var putUserLifeEvent = "Insert into UserLifeEvents(UserName,events,eventtime) values('"+currentUser+"','"+ currentUser+ "  deleted "+req.query.fileName+"." +"','"+ Date(dt.now())+"');";
        console.log("putUserLifeEvent"+ putUserLifeEvent);
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
        },putUserLifeEvent);

    });
    res.status(204).end();
});

router.post('/toggleStar', function (req, res) {
    // var getStarState = "select isStarred from userfiles where username = '"+ currentUser+"' and filedirectorypath = '"+ req.query.filepath+"';";
    // console.log("getStarState"+ getStarState);
    //
    // mysql.fetchData(function(err,results){
    //     if(err){
    //         throw err;
    //     }
    //     else {
    //         if (results.length > 0) {
    //             console.log(JSON.stringify(results));
    //
    //         }
    //     }
    //
    // },getsharedfiles);
    var toggleStar = "update userfiles set isStarred = '" + req.body.isStarred +  "' where username =  '" + currentUser + "' and filedirectorypath = '"+ req.body.shareDirectoryPath + "';";
    console.log("toggleStar"+ toggleStar);
    mysql.putData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                console.log(JSON.stringify(results));
                res.status(204).end();
            }
        }
    },toggleStar);

    res.status(204).end();
});

router.get('/getfilesUnderDir', function (req, res, next) {
    //var resArr = [];

    // glob("public/uploads/*", function (er, files) {
    //
    //     var resArr = files.map(function (file) {
    //         var fileJSON = {};
    //         fileJSON.filename = file.split('/')[2];
    //         fileJSON.filepath = file;
    //         fileJSON.cols = 2  ;
    //         return fileJSON;
    //     });
    //
    //     console.log(resArr);
    //     res.status(200).send(resArr);
    // });

    console.log(req.query.dirPath);
    var resArr = [];
    var getallfilesUnderDirectory = "select filedirectorypath,isDirectory,isStarred from userfiles where username = '"+ currentUser+"' and filedirectorypath like '%" + req.query.dirPath + "'";

    console.log("getallfilesUnderDirectory"+ getallfilesUnderDirectory);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else {
            //console.log("db res:"+ results);
            if (results.length > 0) {
                console.log(JSON.stringify(results));

                for (var i = 0; i < results.length; i++) {

                    var fileJSON = {};
                    var resJSON = JSON.stringify(results[i]);
                    fileJSON.filename = JSON.parse(resJSON)["filedirectorypath"].split('/')[3];
                    fileJSON.filepath = JSON.parse(resJSON)["filedirectorypath"];
                    fileJSON.isDir = JSON.parse(resJSON)["isDirectory"];
                    fileJSON.isStarred = JSON.parse(resJSON)["isStarred"];
                    fileJSON.cols = 2  ;

                    resArr.push(fileJSON);
                }

                return res.status(200).send(JSON.stringify(resArr));

            }
        }

    },getallfilesUnderDirectory);
});

router.get('/setLoggedInUser', function (req, res, next) {

    console.log("Logged in user:"+ req.query.username);
    if(req.query.username != null)
    {
        currentUser = req.query.username;
        req.session.username = currentUser;
        console.log("session username",req.session.username);
        return res.status(200);
    }

});

module.exports = router;



var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'test',
    port	 : 3306
});


var DB = (function () {

    function fetchData(callback,sqlQuery){

        console.log("\nSQL Query::"+sqlQuery);

        // var connection = pool.getConnection();
        // console.log("connection" + connection);
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }
        else
			{
                connection.query(sqlQuery, function(err, rows, fields) {
                    if(err){
                        console.log("ERROR: " + err.message);
                    }
                    else
                    {	// return err or result
                        console.log("DB Results:"+rows);
                        callback(err, rows);
                    }
                    console.log("\nConnection released..");
                    connection.release();
                });

			}

        });


    };

    function putData(callback,sqlQuery) {

        console.log("\nSQL Query::" + sqlQuery);

        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }
            else {
                connection.query(sqlQuery, function (err, rows, fields) {
                    if (err) {
                        console.log("ERROR: " + err.message);
                    }
                    else {	// return err or result
                        console.log("DB Results:" + rows);
                        callback(err, rows);
                    }
                    console.log("\nConnection released..");
                    connection.release();
                });
                // console.log("\nConnection closed..");
                // connection.end();
            }
        });
    };

    return {
        //query: _query,
		fetchData: fetchData,
		putData: putData
    };
})();

module.exports = DB;


// var mysql = require('mysql');
//
// //Put your mysql configuration settings - user, password, database and port
// function getConnection(){
//     var connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : 'root',
//         database : 'test',
//         port	 : 3306
//     });
//     return connection;
// }
//
//
// function fetchData(callback,sqlQuery){
//
//     console.log("\nSQL Query::"+sqlQuery);
//
//     var connection=getConnection();
//
//     connection.query(sqlQuery, function(err, rows, fields) {
//         if(err){
//             console.log("ERROR: " + err.message);
//         }
//         else
//         {	// return err or result
//             console.log("DB Results:"+rows);
//             callback(err, rows);
//         }
//     });
//     console.log("\nConnection closed..");
//     connection.end();
// }
//
// exports.fetchData=fetchData;
//
// function putData(callback,sqlQuery){
//
//     console.log("\nSQL Query::"+sqlQuery);
//
//     var connection=getConnection();
//
//     connection.query(sqlQuery, function(err, rows, fields) {
//         if(err){
//             console.log("ERROR: " + err.message);
//         }
//         else
//         {	// return err or result
//             console.log("DB Results:"+rows);
//             callback(err, rows);
//         }
//     });
//     console.log("\nConnection closed..");
//     connection.end();
// }
//
// exports.putData=putData;
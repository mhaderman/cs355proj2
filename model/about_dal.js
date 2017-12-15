var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT first_name, last_name, player_num FROM player';
    console.log("query: " + query);
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

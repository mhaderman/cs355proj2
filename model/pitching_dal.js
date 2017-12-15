var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'Select * FROM players';
    console.log("PitchingViewAll query: " + query);
    connection.query(query, function(err, result) {
        console.log("result: " + result);
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO pitching (player_num) VALUES(?)';
    connection.query(query, params.player_num, function(err, result){
        callback(err, result);
    });
};

exports.getPitching = function(callback){
    var query = 'SELECT * FROM pitching;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

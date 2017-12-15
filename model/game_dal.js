var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'select * from game';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.addGame = function(params, callback){
    // OBJ UNDEFINED
    var query = "INSERT INTO game (game_id, date, opponent, win_lose, score) VALUES ?;";
    var queryData = [];
    queryData.push([params.game_id, params.date, params.opponent, params.win_lose, params.score]);
    console.log("query: " + query);
    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    });
};
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM player;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getPlayers = function(callback){
    var query = "SELECT player_num, first_name, last_name FROM player";
    console.log(query);
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getPlayerById = function(id, callback){
    var query = "SELECT * FROM player WHERE player_num = " + id + ";";
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getBattingById = function(id, callback){
    var query = "SELECT * FROM batting where player_num = " + id + ";";
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getFieldingById = function(id, callback){
    var query = "SELECT * FROM fielding where player_num = " + id + ";";
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getPitchingById = function(id, callback){
    var query = "SELECT * FROM pitching where player_num = " + id + ";";
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.delete = function(player_num, callback){
    var query = 'DELETE FROM player WHERE player_num = ' + player_num;
    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.addPlayer = function(params, callback){
    var query = "INSERT INTO player(player_num, position, first_name, last_name, weight, height, year, batting_hand, throwing_hand) VALUES ? ;";
    var queryData = [];
    queryData.push([params.player_num, params.position, params.first_name, params.last_name, params.weight, params.height, params.year, params.batting_hand, params.throwing_hand]);
    console.log("query: " + query);
    console.log("result: " + queryData);
    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    })
};
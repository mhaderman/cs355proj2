var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM batting';
    console.log("query: " + query);
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO batting (player_num, game_id, plate_apperances, at_bats, hits, singles, doubles, triples, hr, walks, hbp, stolen_bases ) VALUES ?;';
    console.log("batting insert query:" + query);
    var queryData = [];
    queryData.push([params.player_num, params.game_id, params.plate_apperances, params.at_bats, params.hits,
        params.singles, params.doubles, params.triples, params.hr, params.walks, params.hbp, params.stolen_bases]);
    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    });
};

exports.getAverage = function(params, callback){
    var query = "SELECT (SUM(hits)/(SUM(at_bats))) as batting_average " +
        "FROM batting b JOIN player p ON p.player_num = b.player_num ";
    console.log("query:" + query);
    connection.query(query, params, function(err, result){
        callback(err, result);
    });
};

//not passing player_num
exports.getByNum = function(player_num, callback){
    var query = 'SELECT * FROM player WHERE player_num = ' + player_num + ';';
    var queryData = [player_num];
    console.log("ByNum query:" + query);
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getBattingById = function(id, callback){
    var query = "select first_name, last_name, at_bats, hits, strikeouts from player left join batting on player.player_num = batting.player_num " +
        "group by player.player_num having player.player_num = " + id +";";
    console.log("query: " + query);
    connection.query(query, function(err, res) {
        callback(err, res);
    })
}
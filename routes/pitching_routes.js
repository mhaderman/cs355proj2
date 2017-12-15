var express = require('express');
var router = express.Router();
var pitching_dal = require('../model/pitching_dal');
var game_dal = require('../model/game_dal');
var player_dal = require('../model/player_dal');
var insert = require('../model/dbInsert');

router.get('/all', function(req, res){
    pitching_dal.getPitching(function(err, pitching){
        //player_dal.getAll(function(err, player){
            res.render('pitching/pitchingViewAll', {'pitching' : pitching});

    });
});

router.get('/add', function(req, res){
    game_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }else{
            console.log("result", result);
            res.render('pitching/pitchingAdd', {'game' : result});
        }
    });
});

router.get('/insert', function(req,res){
    pitching_dal.insert(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302, '/pitching/all');
        }
    });
});
module.exports = router;
var express = require('express');
var router = express.Router();
var game_dal = require('../model/game_dal');
var insert = require('../model/dbInsert');

router.get('/all', function(req, res){
    game_dal.getAll(function(err, response){
        console.log(response);
        res.render('game/gameViewAll', {response : response});
    });
});

router.get('/createForm', function(req, res1){
    res1.render('game/gameCreateForm');
});

router.get('/addGame', function(req, res1){
    console.log(req.body.game);
    game_dal.addGame(req.query, function(err, res2){
        console.log("router/addGame res2: " + res2);
        if(err){
            res1.send("Couldn't add game");
        }else{
            res1.send("Game added"); //link to success ejs file
        }
    })
});
module.exports = router;
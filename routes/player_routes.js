var express = require('express');
var router = express.Router();
var player_dal = require('../model/player_dal');

router.get('/all', function(req, res){
    player_dal.getAll(function(err, response){
        console.log(response);
        res.render('player/playerViewAll', {response : response});
    });
});

router.get('/createForm', function(req, res1){
    res1.render('player/playerCreateForm');
});

router.get('/viewBy/:id', function(req, res){
    var id = req.params.id;
    player_dal.getBattingById(id, function(err2, batting){
        player_dal.getFieldingById(id, function(err3, fielding){
            player_dal.getPitchingById(id, function(err4, pitching){
                player_dal.getPlayerById(id, function(err5, player){
                    if(err2 || err3 || err4 || err5){
                        console.log("ERROR");
                        res.send(err2 + err3 + err4 + err5);
                    }
                    console.log(player);
                    var obj = {
                        batting : batting,
                        fielding : fielding,
                        pitching : pitching,
                        player : player,
                        player_num : id};
                    console.log("PlayerViewById obj: " + obj);

                    res.render('player/playerViewById', {object: obj});
                })
            })
        })
    })
})

router.get('/insert', function(req, res1){
    if(req.query.player_num === null){
        res.send('please provide player Num');
    }else if(req.query.position === null){
        res.send('please provide position');
    }else if(req.query.first_name === null){
        res.send('Please provide first name');
    }else if(req.query.last_name === null){
        res.send('Please provide last name');
    }else {
        player_dal.addPlayer(req.query, function (err, res2) {
            console.log("router/addPlayer res2: " + res2);
            if (err) {
                res1.send("Couldn't add player");
            } else {
                res1.send("Player added"); //link to success ejs file

            }
        });
    }});



module.exports = router;
var express = require('express');
var router = express.Router();
var batting_dal = require('../model/batting_dal');
var game_dal = require('../model/game_dal');
var insert = require('../model/dbInsert');

router.get('/all', function(req, res){
    batting_dal.getAll(function(err, response){
        res.render('batting/battingViewAll', {response : response});
    });
});

router.get('/', function(req, res){
    player_dal.getByNum(req.query.player_num, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('player/playerViewAll', {'result' : result});
        }
    });
});

router.get('/createForm', function(req, res1){
    res1.render('batting/battingCreateForm');
});

router.get('/insert', function(req,res){
    console.log(req.body.game)
    batting_dal.insert(req.query, function(err, result){
        if(err){
            res.send('Couldnt add batting stats');
        }else{
            res.send('batting stats added');
        }
    });
});


router.get('/average', function(req, res){
    batting_dal.getAverage(function(err, result){
        console.log("BA result: " + result);
        if(err){
            res.send(err);
        }else{
            res.render('batting/battingAverage', {'result' : result});
        }
    });
});

router.get('/viewBy/:id', function(req, res){
    var id = req.params.id;
    batting_dal.getBattingById(id, function(err2, batting){
        if(err2){
            console.log("error");
        }else{
            var obj = {
                batting : batting
            };
            console.log(obj);
            res.render('batting/battingViewById', {object: obj});
        }
    })
})


module.exports = router;
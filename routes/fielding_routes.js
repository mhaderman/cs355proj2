var express = require('express');
var router = express.Router();
var fielding_dal = require('../model/fielding_dal');
var insert = require('../model/dbInsert');

router.get('/all', function(req, res){
    fielding_dal.getAll(function(err, response){
        res.render('fielding/fieldingViewAll', {response : response});
    });
});

router.get('/insert', function(req,res){
    fielding_dal.insert(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302, '/fielding/all');
        }
    });
});

module.exports = router;
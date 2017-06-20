var mongoose = require('mongoose');
var userModel = require('./mongodb/user.js').userModel;
var mixtapeModel = require('./mongodb/mixtape.js').mixtapeModel;
var compositionModel = require('./mongodb/composition.js').compositionModel;


exports.addNewUser = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: addNewUser");
    userModel.addNewUser(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.verifyTok = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: verifyTok");
    userModel.verifyTok(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getUserById = function(req, res) {
    var params = {};
    params._id = req.params.id;
    console.log(Date.now().toString() + " API CALLED: getUserById");
    userModel.getUserById(params, function(err, cb) {
        if (err) {
            res.send(err);
        } else {
            res.json({code:200, data:cb})
        }
    });
};

exports.likeComposition = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: likeComposition");
    userModel.likeComposition(params, function(err, cb) {
        if (err || !cb || !cb.nModified)
            res.json({code: 200, err:"Not Modified, Bad Input / Already Liked"});
        else {
            compositionModel.IncLikedComposition(params, function(err, callback) {
                if (err)
                    res.send(err);
                res.json({code: 200, data:callback});
            });
        }
    });
};

exports.addNewMixtape = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: addNewMixtape");
    mixtapeModel.addNewMixtape(params, function(err, cb) {
        if (err)
            res.send(err);
        else {
            userModel.updateNewMixtape(cb, function(err, callback) {
                if (err)
                    res.send(err);
                res.json({code: 200, data:callback});
            });
        }
    });
};

exports.getAllMixtapes = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: getAllMixtapes");
    mixtapeModel.getAllMixtapes(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getMixtapeById = function(req, res) {
    var params = {};
    params._id = req.params.id;
    console.log(Date.now().toString() + " API CALLED: getMixtapeById");
    mixtapeModel.getMixtapeById(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getMixtapesFiltered = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: getMixtapesFiltered");
    mixtapeModel.getMixtapesFiltered(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.addNewComposition = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: addNewComposition");
    compositionModel.addNewComposition(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getCompositionById = function(req, res) {
    var params = {};
    params._id = req.params.id;
    console.log(Date.now().toString() + " API CALLED: getCompositionById");
    compositionModel.getCompositionById(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getCompositionsByIds = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: getCompositionsByIds");
    compositionModel.getCompositionsByIds(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};
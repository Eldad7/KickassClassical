var mongoose = require('mongoose');
var userModel = require('./mongodb/user.js').userModel;
var mixtapeModel = require('./mongodb/mixtape.js').mixtapeModel;
var compositionModel = require('./mongodb/composition.js').compositionModel;
var lawgs = require('./node_modules/lawgs/index.js');

lawgs.config({
    aws: {
        accessKeyId: '******', /* Optional if credentials are set in ~/.aws/credentials */
        secretAccessKey: '******', /* Optional */
        region: 'us-east-1' /* Required */
    }
});

var logger  = lawgs.getOrCreate('serverLogs');

exports.addNewUser = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'addNewUser',params:params});
    console.log(Date.now().toString() + " API CALLED: addNewUser");
    userModel.addNewUser(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.verifyTok = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'verifyTok',params:params});
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
    logger.log('API',{apiCall:'getUserById',params:params});
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
    logger.log('API',{apiCall:'likeComposition',params:params});
    console.log(Date.now().toString() + " API CALLED: likeComposition");
    userModel.likeComposition(params, function(err, cb) {
        if (err || !cb || !cb.nModified)
            res.json({code: 400, err:"Not Modified, Bad Input / Already Liked"});
        else {
            compositionModel.IncLikedComposition(params, function(err, callback) {
                if (err)
                    res.send(err);
                res.json({code: 200, data:callback});
            });
        }
    });
};

exports.likeMixtape = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'likeMixtape',params:params});
    console.log(Date.now().toString() + " API CALLED: likeMixtape");
    userModel.likeMixtape(params, function(err, cb) {
        if (err || !cb || !cb.nModified)
            res.json({code: 400, err:"Not Modified, Bad Input / Already Liked"});
        else {
            compositionModel.IncLikedMixtape(params, function(err, callback) {
                if (err)
                    res.send(err);
                res.json({code: 200, data:callback});
            });
        }
    });
};

exports.addNewMixtape = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'addNewMixtape',params:params});
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
    logger.log('API',{apiCall:'getAllMixtapes',params:params});
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
    logger.log('API',{apiCall:'getMixtapeById',params:params});
    console.log(Date.now().toString() + " API CALLED: getMixtapeById");
    mixtapeModel.getMixtapeById(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getMixtapesFiltered = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'getMixtapesFiltered',params:params});
    console.log(Date.now().toString() + " API CALLED: getMixtapesFiltered");
    mixtapeModel.getMixtapesFiltered(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.addNewComposition = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'addNewComposition',params:params});
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
    logger.log('API',{apiCall:'getCompositionById',params:params});
    console.log(Date.now().toString() + " API CALLED: getCompositionById");
    compositionModel.getCompositionById(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getCompositionsByIds = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'getCompositionsByIds',params:params});
    console.log(Date.now().toString() + " API CALLED: getCompositionsByIds");
    compositionModel.getCompositionsByIds(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getAllComposers = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'getAllComposers',params:params});
    console.log(Date.now().toString() + " API CALLED: getAllComposers");
    compositionModel.getAllComposers(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getAllInstruments = function(req, res) {
    var params = req.body;
    logger.log('API',{apiCall:'getAllInstruments',params:params});
    console.log(Date.now().toString() + " API CALLED: getAllInstruments");
    mixtapeModel.getAllInstruments(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};
/**
 * Created by gadyezra on 5/7/17.
 */

var mongoose = require('mongoose');
var userModel = require('./mongodb/userModel.js').userModel;
var channelModel = require('./mongodb/channelModel.js').channelModel;

exports.getAllUsers = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: getAllUsers");
    userModel.getAllUsers(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getUserChannels = function(req, res) {
    var params = req.params;
    console.log(Date.now().toString() + " API CALLED: getUserChannels");
    userModel.getUserChannels(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.isRegToChannel = function(req, res) {
    var params = req.body;
    params.id = req.params.id;
    console.log(Date.now().toString() + " API CALLED: userChannelCheck");
    userModel.userChannelCheck(params, function(err, cb) {
        if (err)
            res.send(err);
        if (!cb) {
            res.json({code:200, data:false})
        } else {
        res.json({code: 200, data:true});}
    });
};

exports.addNewUser = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: addNewUser");
    userModel.addNewUser(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.addNewChannel = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: addNewChannel");
    channelModel.addNewChannel(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};

exports.getAllChannels = function(req, res) {
    var params = req.body;
    console.log(Date.now().toString() + " API CALLED: getAllChannels");
    channelModel.getAllChannels(params, function(err, cb) {
        if (err)
            res.send(err);
        res.json({code: 200, data:cb});
    });
};
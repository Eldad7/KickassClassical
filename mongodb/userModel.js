/**
 * Created by gadyezra on 5/7/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    cDate: Date,
    channels: [{
        name: String,
        price: Number,
        channelNumber: Number
    }],
    totalMonthlyPrice: Number
},{strict:true});

userSchema.statics.addNewUser = function (params,cb) {

    var sumTotal = 0;
    params.channels.forEach(function(channel){
       sumTotal += channel.price;
    });

    var newUser = {
        firstName: params.firstName,
        lastName: params.lastName,
        address: params.address,
        email: params.email,
        cDate: Date.now(),
        channels: params.channels,
        totalMonthlyPrice: sumTotal
    };

    var userObjModel = new userModel(newUser);
    userObjModel.save(cb);
};

userSchema.statics.getAllUsers = function (params,cb) {
    this.find({}, cb);
};

userSchema.statics.getUserChannels = function (params,cb) {
    var queryObj = {
        '_id' : params.id
    };
    var projObj = {
        'channels' : 1
    };
    this.find(queryObj,projObj,cb);
};

userSchema.statics.userChannelCheck = function (params,cb) {
    var queryObj = {
        '_id' : params.id,
        'channels.channelNumber' : params.channelNumber
    };

    this.findOne(queryObj,cb);
};


var userModel = mongoose.model('users', userSchema);
module.exports.userModel = userModel;
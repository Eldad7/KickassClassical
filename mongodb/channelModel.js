/**
 * Created by gadyezra on 5/7/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var channelSchema = new Schema({
    name: String,
    channelNumber: Number,
    description: String,
    pricePerMonth: Number,
    officeAddress: String,
    activityHours: String,
    topShows: [String],
    packageNum: Number,
    cDate: String
},{strict:true});


channelSchema.statics.addNewChannel = function (params,cb) {

    var newChannel = {
        name: params.name,
        channelNumber: params.channelNumber,
        description: params.description,
        pricePerMonth: params.pricePerMonth,
        officeAddress: params.officeAddress,
        activityHours: params.activityHours,
        topShows: params.topShows,
        packageNum: params.packageNum,
        cDate: Date.now()
    };

    var channelObjModel = new channelModel(newChannel);
    channelObjModel.save(cb);
};

channelSchema.statics.getAllChannels = function (params,cb) {
    this.find({}, cb);
};

var channelModel = mongoose.model('channels', channelSchema);
module.exports.channelModel = channelModel;
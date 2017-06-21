var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var mixtapeSchema = new Schema({
    title: String,
    coverImg: String,
    songList: [Schema.Types.ObjectId],
    creatorName: String,
    creatorId: String,
    instruments: [String],
    genre: String,
    keywords: [String],
    cDate: Date,
    likes: {type:Number,default: 0}
},{strict:true});


mixtapeSchema.statics.addNewMixtape = function (params,cb) {

    var newMixtape = {
        title: params.title,
        coverImg: params.coverImg,
        songList: params.songList,
        creatorId: params.creatorId,
        creatorName: params.creatorName,
        instruments: params.instruments,
        genre: params.genre,
        keywords: params.keywords,
        cDate: Date.now()
    };

    var mixtapeObjModel = new mixtapeModel(newMixtape);
    mixtapeObjModel.save(cb);
};

mixtapeSchema.statics.getAllMixtapes = function (params,cb) {
    this.find({}, cb);
};

mixtapeSchema.statics.getMixtapeById = function (params,cb) {
    var query = {
        _id: params._id
    };
    this.findOne(query, cb);
};

mixtapeSchema.statics.getMixtapesFiltered = function (params,cb) {

    var query = {};
    if (params.instruments) {
        query.instruments = {$in:params.instruments}
    }
    if (params.genre) {
        query.genre = params.genre;
    }
    if (params.keywords) {
        query.keywords = {$in:params.keywords}
    }

    this.find(query,cb);
};

mixtapeSchema.statics.getAllInstruments = function (params,cb) {
    this.distinct('instruments',cb)
};

mixtapeSchema.statics.IncLikedMixtape = function (params,cb) {
    var query = {
        _id : params.mId
    };

    var updateObj = {
        $inc: { likes: 1 }
    };

    this.update(query,updateObj,cb)
};

var mixtapeModel = mongoose.model('mixtapes', mixtapeSchema);
module.exports.mixtapeModel = mixtapeModel;
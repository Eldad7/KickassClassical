var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var mixtapeSchema = new Schema({
    indexNum: Number,
    coverImg: String,
    songList: [Schema.Types.ObjectId],
    creatorName: String,
    instruments: [String],
    genre: String,
    keywords: [String],
    cDate: Date
},{strict:true});


mixtapeSchema.statics.addNewMixtape = function (params,cb) {

    var newMixtape = {
        indexNum: params.indexNum,
        coverImg: params.coverImg,
        songList: params.songList,
        creatorId: params.creatorId,
        creatorName: params.creatorName,
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

    this.find(query,cb).limit(8);
};

var mixtapeModel = mongoose.model('mixtapes', mixtapeSchema);
module.exports.mixtapeModel = mixtapeModel;
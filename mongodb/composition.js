var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var compositionSchema = new Schema({
    title: String,
    composer: String,
    key: String,
    url: String,
    timeLength: String,
    likes: {type:Number,default:0}
});


compositionSchema.statics.addNewComposition = function (params,cb) {

    var newComposition = {
        title: params.title,
        key: params.key,
        composer: params.composer,
        url: params.url,
        timeLength: params.timeLength
    };

    var compositionObjModel = new compositionModel(newComposition);
    compositionObjModel.save(cb);
};

compositionSchema.statics.getCompositionById = function (params,cb) {
    var query = {
        _id: params._id
    };
    this.findOne(query, cb);
};

compositionSchema.statics.getCompositionsByIds = function (params,cb) {
    var query = {
        _id: {$in:params.songList}
    };
    this.find(query, cb);
};

compositionSchema.statics.IncLikedComposition = function (params,cb) {
    var query = {
        _id : params.cId
    };

    var updateObj = {
        $inc: { likes: 1 }
    };

    this.update(query,updateObj,cb)
};

compositionSchema.statics.getAllComposers = function (params,cb) {
    this.distinct('composer',cb)
};


var compositionModel = mongoose.model('compositions', compositionSchema);
module.exports.compositionModel = compositionModel;
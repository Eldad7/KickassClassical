var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    token: String,
    address: String,
    email: String,
    cDate: Date,
    mixtapes: [Schema.Types.ObjectId],
    liked: [Schema.Types.ObjectId],
    favInstruments: [String],
    favComposer: [String]
},{strict:true});

userSchema.statics.addNewUser = function (params,cb) {

    var newUser = {
        firstName: params.firstName,
        lastName: params.lastName,
        address: params.address,
        email: params.email,
        cDate: Date.now(),
        mixtapes: [],
        liked: [],
        favInstruments: params.favInstruments,
        favComposer: params.favComposer
    };

    bcrypt.genSalt(5, function (err, salt) {
        if (err) return cb(err);

        bcrypt.hash(params.token, salt, null, function (err, hash) {
            if (err) return cb(err);
            else {
                newUser.token = hash;
                var userObjModel = new userModel(newUser);
                userObjModel.save(cb);
            }
        });
    });
};

userSchema.statics.verifyTok = function(params, cb) {

    this.findOne({email:params.email}, function(queryErr,user){
        if (!queryErr) {
            bcrypt.compare(params.token, user.token, function(err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
            });
        }
    });
};

userSchema.statics.getUserById = function (params,cb) {
    var query = {
        _id: params.uId
    };
    this.findOne(query, cb);
};

userSchema.statics.likeComposition = function (params,cb) {
    var query = {
        _id : params.uId
    };

    var updateObj = {
        $push: { liked: params.cId }
    };

    this.update(query,updateObj,cb)
};

userSchema.statics.updateNewMixtape = function (params,cb) {
    var query = {
        _id : params.creatorId
    };

    var updateObj = {
        $push: { mixtapes: params._id }
    };

    this.update(query,updateObj,cb)
};


var userModel = mongoose.model('users', userSchema);
module.exports.userModel = userModel;
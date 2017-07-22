var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    token: String,
    email: String,
    cDate: Date,
    profileImg: String,
    mixtapes: [Schema.Types.ObjectId],
    liked: [Schema.Types.ObjectId],
    favInstruments: [String],
    favComposer: [String],
    favMixtapes: [Schema.Types.ObjectId]
},{strict:true});

userSchema.statics.addNewUser = function (params,cb) {

    var newUser = {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        profileImg: params.profileImg,
        cDate: Date.now(),
        mixtapes: [],
        liked: [],
        favMixtapes: [],
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
        console.log(user);
        if (!queryErr && !user) {
            bcrypt.compare(params.token, user.token, function(err, isMatch) {
                if (err) return cb(err);
                if (isMatch) {
                    cb(null, user._id);
                } else {
                    cb(null, null);
                }
            });
        } else {
            cb(null,null);
        }
    });
};

userSchema.statics.getUserById = function (params,cb) {
    var query = {
        _id: params._id
    };
    this.findOne(query, cb);
};

userSchema.statics.likeComposition = function (params,cb) {
    var query = {
        _id : params.uId
    };

    var updateObj = {
        $addToSet: { liked: params.cId }
    };

    this.update(query,updateObj,cb)
};

userSchema.statics.likeMixtape = function (params,cb) {
    var query = {
        _id : params.uId
    };

    var updateObj = {
        $addToSet: { favMixtapes: params.mId }
    };

    this.update(query,updateObj,cb)
};

userSchema.statics.updateNewMixtape = function (params,cb) {
    var query = {
        _id : params.creatorId
    };

    var updateObj = {
        $addToSet: { mixtapes: params._id }
    };

    this.update(query,updateObj,cb)
};


var userModel = mongoose.model('users', userSchema);
module.exports.userModel = userModel;
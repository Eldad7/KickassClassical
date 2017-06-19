/**
 * Created by gadyezra on 5/7/17.
 */


var mongoose = require("mongoose");
var dbURI = 'mongodb://gady:12345@ds023452.mlab.com:23452/gady_ezra';
var con = mongoose.connection;
console.log("Loading: " + __filename);

con.on('error', console.error.bind(console, 'MongoDB connection error:'));
con.on('connecting', function() {
    console.log('connecting to MongoDB...');
});
con.on('connected', function() {
    console.log('MongoDB is connected!');
});
con.once('open', function() {
    console.log('MongoDB connection opened!');
});
con.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
con.on('disconnected', function() {
    console.warn('MongoDB disconnected!');
    setTimeout(function(){
        mongoose.connect(dbURI);
    },"reconnecting timeout")

});

var db = mongoose.connect(dbURI, function(err) {
    if (err){
        console.error("Connection Error ! ", err);
        mongoose.disconnect();
    }
    else{
        console.log("mongoDB connection: ", true);
    }
});

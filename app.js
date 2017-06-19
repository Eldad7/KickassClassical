/**
 * Created by gadyezra on 4/27/17.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var main = require('./controller.js');
require('./mongodb/mongoConnect.js');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(
    function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});

app.listen(port);

app.get('/', function(req,res) {
    res.redirect('/apidoc');
});

app.get('/getAllUsers', function(req,res) {
    main.getAllUsers(req,res);
});

app.get('/getAllChannels', function(req,res) {
    main.getAllChannels(req,res);
});

app.post('/addNewChannel', function(req,res) {
    main.addNewChannel(req,res);
});

app.post('/addNewUser', function(req,res) {
    main.addNewUser(req,res);
});

app.get('/getUserChannels/:id', function(req,res) {
    console.log(req.params.id);
    main.getUserChannels(req,res);
});

app.post('/isRegToChannel/:id', function(req,res) {
    main.isRegToChannel(req,res);
});

app.all('*', function(req,res,next) {
    console.log("Request Recieved");
    res.send('404 NO REQUEST FOUND');
});


console.log('listening on port: '+port);
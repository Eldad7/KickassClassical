var express = require('express');
app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
require('./router');
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

console.log('listening on port: '+port);
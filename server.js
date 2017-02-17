var express = require('express')
    network = require('./network/network.js');

var app = express();


//MIDDLEWARE

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {

    res.send("First requisite for traveling time");
});

app.post('/note', network.addNote); // network addNote instead of tipical function for avoid spagetti code




var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log(`Traveling to the future with kubide in port: ${port}`);
});

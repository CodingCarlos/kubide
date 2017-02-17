var express = require('express');

var app = express();


//MIDDLEWARE

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET'); // right now, only get method allowed
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {

    res.send("First requisite for traveling time");
});

var port = process.env.PORT || 3000;


var server = app.listen(port, function () {
    console.log(`Traveling to the future with kubide in port: ${port}`);
});

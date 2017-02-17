var express = require('express'),
    network = require('./network/network.js'),
    bodyParser = require('body-parser');

var app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//MIDDLEWARE
// Only Accept x-www-form-urlencoded because of the standards

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
app.get('/note', network.getNotes);
app.get('/note/:id', network.getNote);

app.post('/favorite',network.addFavorite);
app.get('/favorite/:user',network.getFavorite); // :user discriminates Caps



var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log(`Traveling to the future with kubide in port: ${port}`);
});

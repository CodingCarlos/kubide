var mongoose = require('mongoose'),
    config= require ('../config');

//MONGOOSE CONNECTION

mongoose.connect(config.mongoUri, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.log('mongo connected');
    }
});

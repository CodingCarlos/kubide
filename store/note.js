var mongoose = require('./mongo'),
    uuid = require('node-uuid');

// MONGOOSE SCHEMA
var noteSchema = new mongoose.Schema({
    _id: String,
    date: String,
    user: String,
    text: String,
    favorited: [String]
});

//MONGOOSE MODELS

var noteModel = mongoose.model('noteModel',noteSchema);


exports.add = function(user, text, callback ){
    var data={
            _id: uuid.v4(),
            date: new Date().toISOString(),     // date parsed to ISO 8601 format easier to work with in the future
            user: user,
            text: text,
            favorited: []
        };
        
    var note = new noteModel(data);
    note.save(function(err){
        if(err) console.log("Error! Saving note in MongoDB");
    })

};

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
        if(err) {
            console.error ("Error! Saving note in MongoDB");
            callback({status: 'error', message: 'Error saving note in database'});
        } else {
            callback({status: 'success', data: data}); // if success it will return the data saved.
        }
    });

};

exports.list = function (callback){
    noteModel.find({},function(err, data){
        if(err) {
            console.error ("Error! getting notes from MongoDB");
            callback({status: 'error', message: 'Error gettin notes from database'});
        } else {
            callback({status: 'success', data: data}); // if success it will return the data saved.
        }

    });
};

exports.get = function (id, callback){
    noteModel.find({_id:id},function(err, data){
        if(err) {
            console.error ("Error! getting note from MongoDB");
            callback({status: 'error', message: 'Error gettin note from database'});
        } else {
            callback({status: 'success', data: data}); // if success it will return the data saved.
        }

    });
};

exports.favorite = function (user, noteId, callback){
    noteModel.find({_id:noteId},function(err, data){
        if(err) {
            console.error ("Error! getting note from MongoDB");
            callback({status: 'error', message: 'Error gettin note from database'});
        } else {
            var newFavorited = data[0].favorited;
            if (newFavorited.indexOf(user)==-1){ // if user is not in the list, add user
                newFavorited.push(user);
                data[0].favorited = newFavorited;
                noteModel.update({_id:noteId},{favorited:newFavorited},function(err, updateData){
                    if(err) {
                        console.error ("Error! favoriting note in MongoDB");
                        callback({status: 'error', message: 'Error favoriting to database'});
                    } else {
                        callback({status: 'success', data: data[0]}); // if success it will return the data saved.
                    }
                });
            }
            else{
                callback({status: 'success', data: data[0]}); // if success it will return the data saved.
            }
        }

    });

    //noteModel.update({_id:noteId})
}

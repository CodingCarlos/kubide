var notestore = require('../store/note.js');

exports.addNote = function(req, res, next){

    var text = req.body.text;
    var user = req.body.user;

    if (typeof(text)==="undefined" || typeof(user)==="undefined"){
        error(req, res, {message:"Invalid params"});
    }
    else {
        notestore.add(user, text, function(response){

            response(req , res, dbresponse);
        });
    }
};

exports.getNotes = function (req, res, next){
    notestore.list(function(dbresponse){

        response(req , res, dbresponse);
    });

};

exports.getNote = function (req, res, next){
    var id = req.params.id ;

    if (typeof(id)==="undefined"){
        error(req, res, {message:"Invalid params"});
    }
    else {

        notestore.get(id, function(dbresponse){

            response(req , res, dbresponse);
        });
    }
};

exports.addFavorite = function(req, res, next){

    var noteId = req.body.noteId;
    var user = req.body.user;

    if (typeof(noteId)==="undefined" || typeof(user)==="undefined"){
        error(req, res, {message:"Invalid params"});
    }
    else {

        notestore.favorite(user, noteId, function(dbresponse){

            response(req , res, dbresponse);
        });
    }
};

exports.getFavorite = function (req, res, next){
    var user = req.params.user ;

    if (typeof(user)==="undefined"){
        error(req, res, {message:"Invalid params"});
    }
    else {
        notestore.favorites(user, function(dbresponse){

            response(req , res, dbresponse);
        });
    }

};


// INTERNAL FUNCTIONS FOR RECURSIVE SUCCESS OR ERROR

function response(req, res, data){

    if (data.status=="success"){
        success(req, res, data.data);
    }
    else {
        error(req, res, data);
    }
};

function success (req, res, data){
    res.status(200).json(data);
};

function error (req, res, data){
    res.status(418).json({error: data.message }); // error 418 im a tea pot (error 500 is to bored for a friday evening)
}

var notestore = require('../store/note.js');

exports.addNote = function(req, res, next){

    var text = req.body.text;
    var user = req.body.user;

    notestore.add(user, text, function(response){

        if (response.status=="success"){
            success(req, res, response.data);
        }
        else {
            error(req, res, response);
        }
    });
};

exports.getNotes = function (req, res, next){
    notestore.list(function(response){

        if (response.status=="success"){
            success(req, res, response.data);
        }
        else {
            error(req, res, response);
        }
    });

}


// INTERNAL FUNCTIONS FOR RECURSIVE SUCCESS OR ERROR

function success (req, res, data){
    res.status(200).json(data);
};

function error (req, res, data){
    res.status(418).json({error: data.message }); // error 418 im a tea pot (error 500 is to bored for a friday evening)
}

exports.addNote = function(req, res, next){
    var response = {result:true};
    success (req, res, response);
};

function success (req, res, data){
    res.status(200).json(data);
};

function error (req, res, data){
    res.status(data.code).json({error: data.message });
}


var myJSONObject = {"bindings": [
    {"ircEvent": "PRIVMSG", "method": "newURI", "regex": "^http://.*"},
    {"ircEvent": "PRIVMSG", "method": "deleteURI", "regex": "^delete.*"},
    {"ircEvent": "PRIVMSG", "method": "randomURI", "regex": "^random.*"}
]
};

exports.test = function(req, res){
    res.send(myJSONObject)
};
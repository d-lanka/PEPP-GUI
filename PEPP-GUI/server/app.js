var http = require('http');
var express = require('express');
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();

//configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var userConfigParams = {};

// access public file
app.use(express.static(__dirname + '/public'));

// write and read in file 
function createConfigFile() {
    var filePath = __dirname + '/public/config/' + userConfigParams.fileName + '.js';
    var fileContent = createConfigFileContent();

    fs.writeFile(filePath, fileContent, function (err) {
        if (err) {
            return console.error(err);
        }

        fs.readFile(filePath, function (err, data) {
            if (err) {
                return console.error(err);
            }
        });
    });
}

// routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/config/dataCollection', function (req, res) {
    userConfigParams = req.body;
    createConfigFile();
    res.sendStatus(200);
});

app.get('/config/file', function (req, res) {
    res.sendFile(__dirname + '/public/config/' + req.query.fileName + '.js');
});


// sever 
var server = app.listen(8091, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

function createConfigFileContent() {
    var configObject = {
        "app": {
            "format": "csv",
            "write_to_file": true
        },
        "index": {
            "default": {
                "subscription_id": userConfigParams.recordingID,
                "auth": {
                    "username": userConfigParams.username,
                    "api_key": userConfigParams.identityAPiKey
                }
            }
        },
        "start": userConfigParams.startDate,
        "end": userConfigParams.endDate,
        "analysis": {
            "freqDist": [
                /**
                 * Author types
                 */
            ],
            "timeSeries": [
            ]
        }
    };

    return '"use strict"; module.exports = ' + JSON.stringify(configObject);
};
// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

var oxford = require('project-oxford');
var client = new oxford.Client('41106ff66b604242ab632a658b2d2db3');

app.listen(3000, function () {
  console.log('listening on port 3000');
});
    
var parsed_values;

client.emotion.analyzeEmotion({
    path: 'imgtests/donald-trump.png',
}).then(function (response) {
    parsed_values = [
        {
            'name': 'anger',
            'value': response[0].scores.anger
        },
        {
            'name': 'disgust',
            'value': response[0].scores.disgust
        },
        {
            'name': 'contempt',
            'value': response[0].scores.contempt
        }
    ];
});

// index page 
app.get('/', function(req, res) {
    res.render('pages/index', {
        parsed_values: parsed_values
    });
});
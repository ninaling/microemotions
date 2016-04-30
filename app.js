var express = require('express');
var app = express();

var oxford = require('project-oxford');
var client = new oxford.Client('41106ff66b604242ab632a658b2d2db3');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

client.emotion.analyzeEmotion({
    path: 'imgtests/donald-trump.png',
}).then(function (response) {
    console.log("anger: " + response[0].scores.anger);
    console.log("contempt: " + response[0].scores.contempt);
    console.log("disgust: " + response[0].scores.disgust);
});
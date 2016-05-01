var setEmotionVals=function(){
    for (var i=0; i<numImages; i++){
        client.emotion.analyzeEmotion({
            path: 'images/'+imgUrls[i],
        }).then(function (response) {
            console.log(response);
            anger+=response[0].scores.anger;
            contempt+=response[0].scores.contempt;
            disgust+=response[0].scores.disgust;
            fear+=response[0].scores.fear;
            happiness+=response[0].scores.happiness;
            neutral+=response[0].scores.neutral;
            sadness+=response[0].scores.anger;
            surprise+=response[0].scores.surprise;
        });
    }
}

// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

var oxford = require('project-oxford');
client = new oxford.Client('41106ff66b604242ab632a658b2d2db3');

app.use(express.static('./public'));

parsed_values=[];
var anger=0, contempt=0, disgust=0, fear=0, happiness=0, neutral=0, sadness=0, surprise=0;

app.listen(3000, function () {
  console.log('listening on port 3000');
});

var numImages=3;
var imgUrls=['donald-trump.png', 'ee6.jpg', 'smile.jpg'];

setEmotionVals();

// index page
app.get('/', function(req, res) {
    res.render('pages/index', {
        
    });
});

// answers page
app.get('/answers', function(req, res) {
    res.render('pages/answers', {
        
    });
});

// evaluation page 
app.get('/eval', function(req, res) {
    
    setEmotionVals();
    
    parsed_values = [
        {
            'name': 'anger',
            'value': anger/numImages
        },
        {
            'name': 'contempt',
            'value': contempt/numImages
        },
        {
            'name': 'disgust',
            'value': disgust/numImages
        },
        {
            'name': 'fear',
            'value': fear/numImages
        },
        {
            'name': 'happiness',
            'value': happiness/numImages
        },
        {
            'name': 'neutral',
            'value': neutral/numImages
        },
        {
            'name': 'sadness',
            'value': sadness/numImages
        },
        {
            'name': 'surprise',
            'value': surprise/numImages
        }
    ];
    
    res.render('pages/eval', {
        parsed_values: parsed_values
    });
    
    anger=0, contempt=0, disgust=0, fear=0, happiness=0, neutral=0, sadness=0, surprise=0;
});
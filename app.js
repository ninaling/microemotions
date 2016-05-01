
// server.js
// load the things we need
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var oxford = require('project-oxford');
client = new oxford.Client('41106ff66b604242ab632a658b2d2db3');
var firebase=require('firebase');
var atob=require('atob');
var Blob=require('blob');
app.use(express.static('./public'));
app.listen(3000, function () {
  console.log('listening on port 3000');
});

var numImages=10;
var imgUrls=[];
var snapTemp;

parsed_values=[];
var anger=0, contempt=0, disgust=0, fear=0, happiness=0, neutral=0, sadness=0, surprise=0;

var parseValues=function(snapVals){
    for (var answer in snapVals){
        for (var image in answer){
            console.log(image);
            imgUrls.push(snapVals.answer.image);
        }
    }
}

var setEmotionVals=function(snapVals){
    
    for (var answer in snapVals){
        for (var image in snapVals[answer]){
//            console.log(snapVals[answer][image]);
            console.log("this is an image");
//            imgUrls.push(snapVals.answer.image);
            var blob = b64toBlob(snapVals[answer][image], 'application/json');
            var blobUrl = URL.createObjectURL(blob);
            console.log(blobUrl);
            
            client.emotion.analyzeEmotion({
                path: blobUrl
//                path: snapVals[answer][image]
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
    
//    for (var i=0; i<numImages; i++){
//        client.emotion.analyzeEmotion({
//            path: 'images/'+imgUrls[i],
//        }).then(function (response) {
//            console.log(response);
//            anger+=response[0].scores.anger;
//            contempt+=response[0].scores.contempt;
//            disgust+=response[0].scores.disgust;
//            fear+=response[0].scores.fear;
//            happiness+=response[0].scores.happiness;
//            neutral+=response[0].scores.neutral;
//            sadness+=response[0].scores.anger;
//            surprise+=response[0].scores.surprise;
//        });
//    }
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}


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
    
    // Get a database reference to our posts
    var ref = new Firebase("https://radiant-inferno-8183.firebaseio.com/");

    var snapVals;
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        snapVals=snapshot.val();
//        console.log(snapVals);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
//    parseValues(snapVals);
    
//    anger=0, contempt=0, disgust=0, fear=0, happiness=0, neutral=0, sadness=0, surprise=0;
    setEmotionVals(snapVals);
    
    parsed_values = [
        {
            'name': 'anger',
            'value': anger/30
        },
        {
            'name': 'contempt',
            'value': contempt/30
        },
        {
            'name': 'disgust',
            'value': disgust/30
        },
        {
            'name': 'fear',
            'value': fear/30
        },
        {
            'name': 'happiness',
            'value': happiness/30
        },
        {
            'name': 'neutral',
            'value': neutral/30
        },
        {
            'name': 'sadness',
            'value': sadness/30
        },
        {
            'name': 'surprise',
            'value': surprise/30
        }
    ];
    
    res.render('pages/eval', {
        parsed_values: parsed_values
    });
    

});
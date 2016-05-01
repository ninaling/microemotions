/**
 * Created by Daniel on 5/1/2016.
 */
var fRef = 'https://radiant-inferno-8183.firebaseio.com/';
var f = new Firebase(fRef);
f.set({survey:{}});
var qNum=1;
var picNum=1;
Webcam.attach( '#my_camera' );
function take_snapshot() {
    var questionRef= f.child('q'+qNum);
    Webcam.snap( function(data_uri) {
        document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
        //var surveyRef= f.child('survey');
        //console.log('q'+qNum);
        //var pic = "picture"+picNum;
        questionRef.push(data_uri);
        picNum++;
        if(picNum==4){
            picNum=1;
            qNum++;
        }
    } );
}

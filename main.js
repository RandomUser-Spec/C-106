//https://teachablemachine.withgoogle.com/models/2fcZAbyq_/

Webcam.set({
    width:350,
    length:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' )

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';    
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2fcZAbyq_/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "peace")
        {
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        if(results[0].label == "good job")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "perfect")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
    }
}
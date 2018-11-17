/*
    Maps API key: AIzaSyD6v6JSJAT6RMX48zZWLVj4A1dfktUdS54
*/

//Set Cloudinary cloud name
cloudinary.setCloudName('djzrsujql');
//Cloudinary Upload Widget Implementation
document.getElementById("upload_widget_opener").addEventListener("click", function () {
    cloudinary.openUploadWidget({ cloud_name: 'djzrsujql', upload_preset: 'pa9uueiy', cropping: 'server', folder: 'MeetMeHalfway' },
        function (error, result) { console.log(error, result) });
}, false);
//Chat Functionality with Firebase
var PlayerName = "";
var config = {
    apiKey: "AIzaSyCGIuGjKQNA2I6VTgMR_jt8-Rz3uL8g2js",
    authDomain: "mmh-messenger.firebaseapp.com",
    databaseURL: "https://mmh-messenger.firebaseio.com",
    projectId: "mmh-messenger",
    storageBucket: "",
    messagingSenderId: "232777551897"
};
firebase.initializeApp(config);
var database = firebase.database();
//if the user sends a message
$("#submit-chat").on("click", function (event) {
    //prevent refresh
    event.preventDefault();
    console.log(this);
    //grab the value of what the user type  and then empty it;
    var messages = $("#chat-input").val().trim();
    $("#chat-input").val("");

    //restate the newMessage to give it's a value
    newMessage = PlayerName + " : " + messages;

    //update each chat messages into teh database along with the time it was added
    database.ref("/chat").update({
        message: newMessage,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });//database push
}); //on click

//updating the chat messages in the browser's chat window by using the last one added into the database (time added)
database.ref("/chat").orderByChild("dateAdded").limitToLast(1).on("value", function (snapshot) {
    $("#chat-window").append("</br>" + snapshot.val().message + "</br>");
});

// Maps stuff
var map;
var latVar = 41.85;
var lngVar = -87.64;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {center: {lat: latVar, lng: lngVar}, zoom: 13});
}
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

// no comments for you
// it was hard to write
// so it should be hard to read

var usersArray = [
    ["Person_1", 42.064, -87.690],
    ["Person_2", 42.053, -87.679],
    ["Person_3", 42.048, -87.699],
    ["Person_4", 42.027, -87.676],
    ["Person_5", 42.000, -87.000],
    ["Person_6", 42.059, -87.675]
];
var map, infoWindow;
// Do I still need these? 
var latVar = 0;
var lngVar = 0;
// --------------------------
var currentLat = 0, currentLng = 0;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {center: {lat: latVar, lng: lngVar}, zoom: 13});
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geoloc
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            currentLat = pos.lat;
            currentLng = pos.lng;

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
            getDistance();
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

// Sort users based on distance from current location
var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistance = function() {
    var sortedArray = new Array(usersArray.length);

    for (var z = 0; z < sortedArray.length; z++) {
        sortedArray[z] = new Array(2);
    }

    for (y = 0; y < usersArray.length; y++) {
        var earthRad = 6378137;
        var dLat = rad(usersArray[y][1] - currentLat);
        var dLng = rad(usersArray[y][2] - currentLng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
            Math.cos(rad(currentLat)) * Math.cos(rad(usersArray[y][1])) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = (earthRad * c).toFixed(3);

        sortedArray[y][0] = usersArray[y][0];
        sortedArray[y][1] = d;

        // console.log(d);
    }

    sortedArray.sort(function(a, b) {
        return a[1] - b[1]
    });
    
    console.log("V- Sorted Array -V");
    console.log(sortedArray);
}

// getDistance();

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? "Error: The Geolocation service failed" : "Error: Your browser doesn\'t support geolocation");
    infoWindow.open(map);
}
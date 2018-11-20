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
var map, infoWindow;
var latVar = 41.85;
var lngVar = -87.64;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), { center: { lat: latVar, lng: lngVar }, zoom: 13 });
    infoWindow = new google.maps.InfoWindow;
    var evanston = { lat: 42.0577401, lng: -87.67564449999999 };
    // Try HTML5 geoloc
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
            //Click to search restaurants nearby
            var restaurantButton = document.getElementById('find-food');
            restaurantButton.onclick = function () {
                service.nearbySearch(
                    { location: pos, radius: 5000, type: ['restaurant'] },
                    function (results, status, pagination) {
                        if (status !== 'OK') return;

                        createMarkers(results);
                        moreButton.disabled = !pagination.hasNextPage;
                        getNextPage = pagination.hasNextPage && function () {
                            pagination.nextPage();
                        };
                    });
            };
            //Click to search bars nearby 
            var barButton = document.getElementById('find-bars');
            barButton.onclick = function () {
                service.nearbySearch(
                    { location: pos, radius: 5000, type: ['bar'] },
                    function (results, status, pagination) {
                        if (status !== 'OK') return;

                        createMarkers(results);
                        moreButton.disabled = !pagination.hasNextPage;
                        getNextPage = pagination.hasNextPage && function () {
                            pagination.nextPage();
                        };
                    });
            };
            //Click to search gyms nearby
            var gymButton = document.getElementById('find-gyms');
            gymButton.onclick = function () {
                service.nearbySearch(
                    { location: pos, radius: 5000, type: ['gym'] },
                    function (results, status, pagination) {
                        if (status !== 'OK') return;

                        createMarkers(results);
                        moreButton.disabled = !pagination.hasNextPage;
                        getNextPage = pagination.hasNextPage && function () {
                            pagination.nextPage();
                        };
                    });
            };
            //Click to search parks nearby
            var parkButton = document.getElementById('find-parks');
            parkButton.onclick = function () {
                service.nearbySearch(
                    { location: pos, radius: 5000, type: ['park'] },
                    function (results, status, pagination) {
                        if (status !== 'OK') return;

                        createMarkers(results);
                        moreButton.disabled = !pagination.hasNextPage;
                        getNextPage = pagination.hasNextPage && function () {
                            pagination.nextPage();
                        };
                    });
            };
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };
};


function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        var li = document.createElement('li');
        li.textContent = place.name;
        placesList.appendChild(li);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? "Error: The Geolocation service failed" : "Error: Your browser doesn\'t support geolocation");
    infoWindow.open(map);
};


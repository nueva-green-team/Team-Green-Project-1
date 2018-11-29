var newMessage = "";
// Maps stuff
var map, infoWindow;
var latVar = 41.85;
var lngVar = -87.64;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), { center: { lat: latVar, lng: lngVar }, zoom: 13 });
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geoloc
    if (navigator.geolocation) {
        function AutocompleteDirectionsHandler(map) {
            console.log('AutocompleteDirectionsHandler constructor');
            console.log('ACDHMAp', map);


            this.map = map;
            this.originPlaceId = null;
            this.destinationPlaceId = null;
            this.travelMode = 'WALKING';
            var originInput = document.getElementById('origin-input');
            var destinationInput = document.getElementById('destination-input');
            var modeSelector = document.getElementById('mode-selector');
            this.directionsService = new google.maps.DirectionsService;
            this.directionsDisplay = new google.maps.DirectionsRenderer;
            this.directionsDisplay.setMap(map);
            var originAutocomplete = new google.maps.places.Autocomplete(
                originInput, { placeIdOnly: true });
            var destinationAutocomplete = new google.maps.places.Autocomplete(
                destinationInput, { placeIdOnly: true });

            this.sayHello('Mark')

            this.setupClickListener('changemode-walking', 'WALKING');
            console.log(this);
            this.setupClickListener('changemode-transit', 'TRANSIT');
            this.setupClickListener('changemode-driving', 'DRIVING');

            this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
            this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);

        }

        AutocompleteDirectionsHandler.prototype.sayHello = function (name) {
            console.log(`Hello ${name}!`);

        };
        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        AutocompleteDirectionsHandler.prototype.setupClickListener = function (id, mode) {
            console.log('what i expected');

            var radioButton = document.getElementById(id);
            var me = this;
            radioButton.addEventListener('click', function () {
                me.travelMode = mode;
                me.route();
            });
        };

        AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
            var me = this;
            autocomplete.bindTo('bounds', this.map);
            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.place_id) {
                    window.alert("Please select an option from the dropdown list.");
                    return;
                }
                if (mode === 'ORIG') {
                    me.originPlaceId = place.place_id;
                } else {
                    me.destinationPlaceId = place.place_id;
                }
                me.route();
            });
        };

        AutocompleteDirectionsHandler.prototype.route = function () {
            if (!this.originPlaceId || !this.destinationPlaceId) {
                return;
            }
            var me = this;

            this.directionsService.route({
                origin: { 'placeId': this.originPlaceId },
                destination: { 'placeId': this.destinationPlaceId },
                travelMode: this.travelMode
            }, function (response, status) {
                if (status === 'OK') {
                    me.directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        };
        //Markers
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
        //Error handle
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ? "Error: The Geolocation service failed" : "Error: Your browser doesn\'t support geolocation");
            infoWindow.open(map);
        };
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
            console.log(pos);
            
            //Click to search restaurants nearby
            var restaurantButton = document.getElementById('find-food');
            restaurantButton.onclick = function () {
                service.nearbySearch(
                    { location: pos, radius: 5000, type: ['restaurant'] },
                    function (results, status, pagination) {
                        if (status !== 'OK') return;
                        console.log(results);
                        createMarkers(results);
                        // moreButton.disabled = !pagination.hasNextPage;
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
                        // moreButton.disabled = !pagination.hasNextPage;
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
                        // moreButton.disabled = !pagination.hasNextPage;
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
                        // moreButton.disabled = !pagination.hasNextPage;
                        getNextPage = pagination.hasNextPage && function () {
                            pagination.nextPage();
                        };
                    });
            };

            console.log('in initMap', map);

            var autocompleteHandler = new AutocompleteDirectionsHandler(map);
            autocompleteHandler.sayHello('Mark')
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var getNextPage = null;
    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyCGIuGjKQNA2I6VTgMR_jt8-Rz3uL8g2js",
        authDomain: "mmh-messenger.firebaseapp.com",
        databaseURL: "https://mmh-messenger.firebaseio.com",
        projectId: "mmh-messenger",
        storageBucket: "mmh-messenger.appspot.com",
        messagingSenderId: "232777551897"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    //if the Player sends a message
    $("#submit-chat").on("click", function (event) {
        //prevent refresh
        event.preventDefault();
        console.log(this);
        //Grabs input and empties
        var messages = $("#chat-input").val().trim();
        $("#chat-input").val("");

        //newMessage value change
        newMessage = messages;

        //Update chats in database
        database.ref("/chat").update({
            message: newMessage,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });
    //Update browser chat window
    database.ref("/chat").orderByChild("dateAdded").limitToLast(1).on("value", function (snapshot) {
        $("#chat-window").append("</br>" + snapshot.val().message + "</br>");
    });
};
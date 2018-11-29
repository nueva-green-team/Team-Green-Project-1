// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    profileInfo();
    testAPI();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function () {
  FB.init({
    appId: '371384870299199',
    cookie: true,  // enable cookies to allow the server to access 
    // the session
    xfbml: true,  // parse social plugins on this page
    version: 'v3.2' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });

};
// Load the SDK asynchronously
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function (response) {
    console.log(JSON.stringify(response));
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
};
//Get profile pic
var profilePic = "";
var userId = "";
var userName = "";
function profileInfo() {
  console.log("incoming profile info");
  FB.api(
    '/me',
    'GET',
    { "fields": "id,name,picture,email" },
    function (response) {
      console.log(JSON.stringify(response));
      console.log(response.picture.data.url);
      userName = response.name;
      $("#profile-pic").html(`<img src=${response.picture.data.url} / >`);
      $("#profile-name").html(response.name);
      profilePic = response.picture.data.url;
      userId = response.id;



    }
  );
};
// Firebase for Profile Data
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAvqRR0ccz8wJpmtjNKUZXScqfWTNscbBM",
  authDomain: "halfway-profile-data.firebaseapp.com",
  databaseURL: "https://halfway-profile-data.firebaseio.com",
  projectId: "halfway-profile-data",
  storageBucket: "halfway-profile-data.appspot.com",
  messagingSenderId: "216446343066"
};
firebase.initializeApp(config);
var database = firebase.database();
var provider = new firebase.auth.FacebookAuthProvider();
// $("#profile-pic").html()
// $('#photos').append(allImages);
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });
// firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
firebase.auth().signInWithPopup(provider).then(function (result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(result);
  // ...
}).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

// Step 1.
// User tries to sign in to Facebook.
// auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function (error) {
//   // An error happened.
//   if (error.code === 'auth/account-exists-with-different-credential') {
//     // Step 2.
//     // User's email already exists.
//     // The pending Facebook credential.
//     var pendingCred = error.credential;
//     // The provider account's email address.
//     var email = error.email;
//     // Get sign-in methods for this email.
//     auth.fetchSignInMethodsForEmail(email).then(function (methods) {
//       // Step 3.
//       // If the user has several sign-in methods,
//       // the first method in the list will be the "recommended" method to use.
//       if (methods[0] === 'password') {
//         // Asks the user his password.
//         // In real scenario, you should handle this asynchronously.
//         var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
//         auth.signInWithEmailAndPassword(email, password).then(function (user) {
//           // Step 4a.
//           return user.link(pendingCred);
//         }).then(function () {
//           // Facebook account successfully linked to the existing Firebase user.
//           goToApp();
//         });
//         return;
//       }
//       // All the other cases are external providers.
//       // Construct provider object for that provider.
//       // TODO: implement getProviderForProviderId.
//       var provider = getProviderForProviderId(methods[0]);
//       // At this point, you should let the user know that he already has an account
//       // but with a different provider, and let him validate the fact he wants to
//       // sign in with this provider.
//       // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
//       // so in real scenario you should ask the user to click on a "continue" button
//       // that will trigger the signInWithPopup.
//       auth.signInWithPopup(provider).then(function (result) {
//         // Remember that the user may have signed in with an account that has a different email
//         // address than the first one. This can happen as Firebase doesn't control the provider's
//         // sign in flow and the user is free to login using whichever account he owns.
//         // Step 4b.
//         // Link to Facebook credential.
//         // As we have access to the pending credential, we can directly call the link method.
//         result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred) {
//           // Facebook account successfully linked to the existing Firebase user.
//           goToApp();
//         });
//       });
//     });
//   }
// });
firebase.auth().signOut().then(function () {
  // Sign-out successful.
}).catch(function (error) {
  // An error happened.
});
//LIKE OR NOT?
var PlayerName = '';
var userName = "";
var user_1_Choice = "";
var user_2_Choice = "";
var newMessage = "";
var turns = 1;
var delayTimer;
var delayTimer2;
var IsGameResetting = false;
//Score Check
var CheckWinners = {
  //Restart Game
  resetGame: function () {
    IsGameResetting = false;
    turns = 1;
    //update the turn in the firebase to 1
    database.ref().update({
      turn: turns
    });
  },
  //Clear TO and Reset
  clearDelay: function () {
    clearTimeout(delayTimer);
    CheckWinners.resetGame();
  },
  //Winner Message Player 1
  updateWinner1: function () {
    $("#like").html(userName + `<img src=${response.picture.data.url} / >` + " likes you!!!");
  },
  //Winner Message Player 2
  updateWinner2: function () {
    $("#like").html("It's not a match with " + userName);
  },
  userMatch: function () {
    // If Player 1 picks rock and Player 2 picks scissors then Player 1 wins.
    if (user_1_Choice == "yes" && user_2_Choice == "yes") {
      CheckWinners.updateWinner1();
      window.location.href = "https://nueva-green-team.github.io/Team-Green-Project-1/places.html";

    }
    else {
      CheckWinners.updateWinner2();
    }
  }
};
database.ref().on("value", function (snapshot) {
  var databaseTurn = snapshot.child("turn").val();
  if (databaseTurn == 3 && IsGameResetting == false) {
    IsGameResetting = true;
    //Restating variables to match the database
    user_1_Choice = snapshot.child("players").child(1).val().choice;
    user_2_Choice = snapshot.child("players").child(2).val().choice;
    //Check for winner
    CheckWinners.userMatch();
    // Display this page for 5 seconds and call clearDelay function to reset the game
    delayTimer = setTimeout(CheckWinners.clearDelay, 5 * 1000);
  }
});
//if Player 1 makes a choice 
$("#like-btn").on("click", function () {
  //Grabs player choice
  user_1_Choice = $(this).val();
  console.log(user_1_Choice);

  database.ref().once('value').then(function (snapshot) {
    //Turn Switch	
    turns = (snapshot.child("turn").exists() ? snapshot.child("turn").val() : turns);
    turns++;
    database.ref("players/1").update({
      choice: user_1_Choice,
      pic: profilePic,
      name: userName
    });
    database.ref().update({
      turn: turns
    });
  });
});
//if Player 2 makes a choice 
$("#like-btn").on("click", function () {
  //Grabs player choice
  user_2_Choice = $(this).val();
  console.log(user_2_Choice);

  database.ref().once('value').then(function (snapshot) {
    //Turn Switch		
    turns = (snapshot.child("turn").exists() ? snapshot.child("turn").val() : turns);
    turns++;
    database.ref("players/2").update({
      choice: user_2_Choice,
      pic: profilePic,
      name: userName
    });
    database.ref().update({
      turn: turns,
    });
  });
});
//Photo Collage
$("#btn").on("click", function () {
  database.ref("/players").on("value", function (snapshot) {
    console.log(snapshot);
    for (var i = 0; i < response.length; i++) {
      $("#photos").html();
    }
  });
});
// //Save location
// var geocoder;
// var pos;
// var mylocation = "";
// var map;
// var infowindow;
// var latVar = 41.85;
// var lngVar = -87.64;
// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), { center: { lat: latVar, lng: lngVar }, zoom: 13 });
//   infowindow = new google.maps.InfoWindow;
//   // Try HTML5 geoloc
//   if (navigator.geolocation) {
//     geocoder = new google.maps.Geocoder;

//     document.getElementById('submit').addEventListener('click', function() {
//       geocodeLatLng(geocoder, map, infowindow);
//     });

//     navigator.geolocation.getCurrentPosition(function (position) {
//       pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//     });
//   }
// };
// //geocoding
// function geocodeLatLng(geocoder, map, infowindow) {
//   var input = document.getElementById('latlng').value;
//   var latlngStr = input.split(',', 2);
//   var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
//         geocoder.geocode({'location': latlng}, function(results, status) {
//           if (status === 'OK') {
//             if (results[0]) {
//               map.setZoom(11);
//               var marker = new google.maps.Marker({
//                 position: latlng,
//                 map: map
//               });
//               infowindow.setContent(results[0].formatted_address);
//               infowindow.open(map, marker);
//             } else {
//               window.alert('No results found');
//             }
//           } else {
//             window.alert('Geocoder failed due to: ' + status);
//           }
//         });
// }

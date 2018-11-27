//Set Cloudinary cloud name
cloudinary.setCloudName('djzrsujql');
//Cloudinary Upload Widget Implementation
document.getElementById("upload_widget_opener").addEventListener("click", function () {
    cloudinary.openUploadWidget({ cloud_name: 'djzrsujql', upload_preset: 'pa9uueiy', cropping: 'server', folder: 'MeetMeHalfway' },
        function (error, result) { console.log(error, result) });
}, false);

// for the image grid layout
// function getRandomSize(min, max) {
//     return Math.round(Math.random() * (max - min) + min);
//   }

//   var allImages = "";

//   for (var i = 0; i < 25; i++) {
//     var width = getRandomSize(200, 400);
//     var height =  getRandomSize(200, 400);
//     allImages += '<img src="https://placekitten.com/'+width+'/'+height+'" alt="pretty kitty">';
//   }

//   $('#photos').append(allImages);
function getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  var allImages = "";
  
  for (var i = 0; i < 25; i++) {
    var width = getRandomSize(200, 400);
    var height =  getRandomSize(200, 400);
    allImages += '<img src="https://placekitten.com/'+width+'/'+height+'" alt="pretty kitty">';
  }
  $('#photos').append(allImages);
  // added cloudinary photos with angle//
  cloudinary.imageTag('front_face.png', {secure: true, transformation: [
    {width: 150, height: 150, gravity: "face", radius: 20, effect: "sepia", crop: "thumb"},
    {overlay: new cloudinary.Layer().publicId("cloudinary_icon"), gravity: "south_east", x: 5, y: 5, width: 50, opacity: 60, effect: "brightness:200"},
    {angle: 10}
    ]}).toHtml();

// Firebase for Profile Data
// Initialize Firebase
var userName = "";
var userEmail = "";
var userAge = "";
var userPW = "";
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
//   $("#add-user-btn").on("click", function (event) {
//     //prevent refresh
//     event.preventDefault();
//     console.log(this);
//     //Grabs input and empties
//     userEmail = $("#email-input").val().trim();
//     $("#email-input").val("");
//     userAge = $("#age-input").val().trim();
//     $("#age-input").val("");
//     userName = $("#username-input").val().trim();
//     $("#name-input").val("");
//     userPW = $("#pw-input").val().trim();
//     $("#password-input").val("");

//     //Update info in database
//     database.ref("/users").update({
//         name: userName,
//         age:  userAge,
//         email: userEmail,
//         password: userPW
//     });
// });
  $("#profile-pic").html()
  $('#photos').append(allImages);
  //Facebook Login
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
    console.log(response);
});
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};
firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(result);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });

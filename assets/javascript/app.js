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
//Google Login

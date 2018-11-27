//Set Cloudinary cloud name
cloudinary.setCloudName('djzrsujql');
//Cloudinary Upload Widget Implementation
document.getElementById("upload_widget_opener").addEventListener("click", function () {
    cloudinary.openUploadWidget({ cloud_name: 'djzrsujql', upload_preset: 'pa9uueiy', cropping: 'server', folder: 'MeetMeHalfway' },
        function (error, result) { console.log(error, result) });
}, false);

// for the image grid layout
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

  // On click for submitting profile information
    // Grabs user inputs
    // Create local "temp" object for holding profile data
    // Upload profile data to the database
    // Console Log
  
  // Create Firebase event for adding profile to the database
    // Store everything into a variable
  
  // Push firebase data to appropriate Profile sections


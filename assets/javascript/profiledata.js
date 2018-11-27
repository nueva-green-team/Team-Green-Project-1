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
  $("#add-user-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user inputs
    var name = $("#full-name-input").val().trim();
    var age = $("#age-input").val().trim();
    var sex = $("sex-input").val().trim();
    var bio = $("bio-input").val().trim();
  })

    // Create local "temp" object for holding profile data
    // Upload profile data to the database
    // Console Log
  
  // Create Firebase event for adding profile to the database
    // Store everything into a variable
  
  // Push firebase data to appropriate Profile sections
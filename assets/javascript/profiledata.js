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
   // On click for submitting profile information
   $("#add-user-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user inputs
    var name = $("#full-name-input").val().trim();
    var age = $("#age-input").val().trim();
    var sex = $("sex-input").val().trim();
    var bio = $("bio-input").val().trim();

    // Create local "temp" object for holding profile data
    var newUser = {
      personName: name,
      personAge: age,
      personSex: sex,
      personBio: bio
    };
  // Upload profile data to the database
  database.ref().push(newUser);
      
  })
   

    // Create local "temp" object for holding profile data
    // Upload profile data to the database
    // Console Log
  
  // Create Firebase event for adding profile to the database
    // Store everything into a variable
  
  // Push firebase data to appropriate Profile sections

  // Initialize Array of Objects
  var arrayOfObjects = [];
  // Parse & Scrub the Firebase Data and then Append to HTML Table
  $.each(data, function(key, value){

    // Collect variables
    var profileName = value.name;
    var profileAge = value.age;
    var profileSex = value.sex;
    var profileAbout = value.about;
// Create a new Object for the profile locally 
var newObject = {
  name: profileName,
  age: profileAge,
  sex: profileSex,
  about: profileAbout,
};

// Push the new Object to the array of Objects
arrayOfObjects.push(newObject);

// Create New HTML Data Cells
var profileNameTd = $('<td>');
var profileAgeTd = $('<td>');
var profileSexTd = $('<td>');
var profileAboutTd = $('<td>');

// Add text to the HTML Data Cells
profileNameTd.text(arrayOfObjects[j].name);
profileAgeTd.text(arrayOfObjects[j].age);
profileSexTd.text(arrayOfObjects[j].sex);
profileAboutTd.text(arrayOfObjects[j].about);

 // Append HTML Data Cells to the new Row
 newRow.append(profileNameTd);
 newRow.append(profielAgeTd);
 newRow.append(profileSexTd);
 newRow.append(profileAboutTd);

 // Append new Row to the HTML Table
 $('.table').append(newRow);
})
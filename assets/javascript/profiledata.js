
// Firebase for Profile Data
var config = {
  apiKey: "AIzaSyAvqRR0ccz8wJpmtjNKUZXScqfWTNscbBM",
  authDomain: "halfway-profile-data.firebaseapp.com",
  databaseURL: "https://halfway-profile-data.firebaseio.com",
  projectId: "halfway-profile-data",
  storageBucket: "halfway-profile-data.appspot.com",
  messagingSenderId: "216446343066"
};
// Initialize Firebase
firebase.initializeApp(config);
var database = firebase.database();

var data;
database.ref().on("value", function (snapshot) {
  data = snapshot.val();
  refreshTable();
});

// On click for submitting profile information
// On click for submitting profile information
$("#add-user-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user inputs
  var name = $("#full-name-input").val().trim();
  var age = $("#age-input").val().trim();
  var sex = $("sex-input").val().trim();
  var bio = $("bio-input").val().trim();

  // Checks for user inputs  
  if (name == "" || name == null) {
    alert("Please enter a Name!");
    return false;
  }
  if (age == "" || age == null) {
    alert("Please enter an Age!");
    return false;
  }
  if (sex == "" || sex == null) {
    alert("Please enter a Sex!");
    return false;
  }
  if (bio == "" || bio == null) {
    alert("Please enter a Bio!");
    return false;
  }
  // check if Age input is 18-99
  else if (parseInt(Profile.substring(0, 2)) < 18 || parseInt(Profile.substring(0, 2)) > 99) {
    alert("You must be over 18!");
    return false;
  }
  // Edit the Profile to include the date of the new submission
  var today = new Date();
  var thisMonth = today.getMonth() + 1;
  var thisDate = today.getDate();
  var thisYear = today.getFullYear();

  // Create a String from the Date 
  var dateString = "";
  var dateString = dateString.concat(thisMonth, "/", thisDate, "/", thisYear);

  // Create a Date and Time String for Storage
  var Profile = dateString.concat(" ", Profile);

  // Push New Data to FireBase
  database.ref().push({
    personName: name,
    personAge: age,
    personSex: sex,
    personBio: bio
  });

  // Clear Input Fields After successful submission
  $("#profile-name").val("");
  $("#profile-age").val("");
  $("#profile-sex").val("");
  $("#profile-bio").val("");

  // Prevent Default Refresh of Submit Button
  return false;
});

// Function to Update the HTML Table on the DOM
function refreshTable() {

  // Clear Old Data from Browser Table
  $('.table-body-row').empty();

  // Initialize Array of Objects
  var arrayOfObjects = [];
  // Parse & Scrub the Firebase Data and then Append to HTML Table
  $.each(data, function (key, value) {

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
    var profileBioTd = $('<td>');

    // Add text to the HTML Data Cells
    profileNameTd.text(arrayOfObjects[j].name);
    profileAgeTd.text(arrayOfObjects[j].age);
    profileSexTd.text(arrayOfObjects[j].sex);
    profileBioTd.text(arrayOfObjects[j].bio);

    // Append HTML Data Cells to the new Row
    newRow.append(profileNameTd);
    newRow.append(profielAgeTd);
    newRow.append(profileSexTd);
    newRow.append(profileBioTd);

    // Append new Row to the HTML Table
    $('.table').append(newRow);
  });
};
//Set Cloudinary cloud name
cloudinary.setCloudName('djzrsujql');
//Cloudinary Upload Widget Implementation
document.getElementById("upload_widget_opener").addEventListener("click", function () {
  cloudinary.openUploadWidget({ cloud_name: 'djzrsujql', upload_preset: 'pa9uueiy', cropping: 'server', folder: 'MeetMeHalfway' },
    function (error, result) { console.log(error, result) });
}, false);

// for the image grid layout
function getRandomSize(min, max) {
<<<<<<< HEAD
  return Math.round(Math.random() * (max - min) + min);
}

var allImages = "";

for (var i = 0; i < 25; i++) {
  var width = getRandomSize(200, 400);
  var height = getRandomSize(200, 400);
  allImages += '<img src="https://placekitten.com/' + width + '/' + height + '" alt="pretty kitty">';
}

$('#photos').append(allImages);
$("#profile-pic").html();
=======
    return Math.round(Math.random() * (max - min) + min);
  }
  
  var allImages = "";
  
  for (var i = 0; i < 25; i++) {
    var width = getRandomSize(200, 400);
    var height =  getRandomSize(200, 400);
    allImages += '<img src="https://placekitten.com/'+width+'/'+height+'" alt="pretty kitty">';
  }
  
  $('#photos').append(allImages);

<<<<<<< HEAD
  // added cloudinary photos with angle//
  cloudinary.imageTag('front_face.png', {secure: true, transformation: [
    {width: 150, height: 150, gravity: "face", radius: 20, effect: "sepia", crop: "thumb"},
    {overlay: new cloudinary.Layer().publicId("cloudinary_icon"), gravity: "south_east", x: 5, y: 5, width: 50, opacity: 60, effect: "brightness:200"},
    {angle: 10}
    ]}).toHtml();
=======

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
<<<<<<< HEAD

  var database = firebase.database();

  // On click for submitting profile information
    // Grabs user inputs
    // Create local "temp" object for holding profile data
    // Upload profile data to the database
    // Console Log
  
  // Create Firebase event for adding profile to the database
    // Store everything into a variable
  
  // Push firebase data to appropriate Profile sections

=======
</script>
=======
  $("#profile-pic").html()
>>>>>>> f9e37a131a6d94ebada4fa00fc6960aec19f77b0
>>>>>>> c382da004d32922edbc923afbe259f65d0577589
>>>>>>> d6546969da534a91271a2bedc3a6b4f933499aba
>>>>>>> e72e9a867a42a1ab5592aa296b237157b62c8baa

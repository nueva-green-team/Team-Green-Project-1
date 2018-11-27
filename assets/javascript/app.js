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


// Firebase for Profile Data

<script src="https://www.gstatic.com/firebasejs/5.5.9/firebase.js"></script>
<script>
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
</script>
=======
  $("#profile-pic").html()
>>>>>>> f9e37a131a6d94ebada4fa00fc6960aec19f77b0
>>>>>>> c382da004d32922edbc923afbe259f65d0577589

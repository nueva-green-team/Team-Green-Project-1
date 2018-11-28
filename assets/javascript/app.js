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
  var height = getRandomSize(200, 400);
  allImages += '<img src="https://placekitten.com/' + width + '/' + height + '" alt="pretty kitty">';
}
$('#photos').append(allImages);
// added cloudinary photos with angle//
cloudinary.imageTag('front_face.png', {
  secure: true, transformation: [
    { width: 150, height: 150, gravity: "face", radius: 20, effect: "sepia", crop: "thumb" },
    { overlay: new cloudinary.Layer().publicId("cloudinary_icon"), gravity: "south_east", x: 5, y: 5, width: 50, opacity: 60, effect: "brightness:200" },
    { angle: 10 }
  ]
}).toHtml();

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
// $("#profile-pic").html()
// $('#photos').append(allImages);
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
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
auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function (error) {
  // An error happened.
  if (error.code === 'auth/account-exists-with-different-credential') {
    // Step 2.
    // User's email already exists.
    // The pending Facebook credential.
    var pendingCred = error.credential;
    // The provider account's email address.
    var email = error.email;
    // Get sign-in methods for this email.
    auth.fetchSignInMethodsForEmail(email).then(function (methods) {
      // Step 3.
      // If the user has several sign-in methods,
      // the first method in the list will be the "recommended" method to use.
      if (methods[0] === 'password') {
        // Asks the user his password.
        // In real scenario, you should handle this asynchronously.
        var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
        auth.signInWithEmailAndPassword(email, password).then(function (user) {
          // Step 4a.
          return user.link(pendingCred);
        }).then(function () {
          // Facebook account successfully linked to the existing Firebase user.
          goToApp();
        });
        return;
      }
      // All the other cases are external providers.
      // Construct provider object for that provider.
      // TODO: implement getProviderForProviderId.
      var provider = getProviderForProviderId(methods[0]);
      // At this point, you should let the user know that he already has an account
      // but with a different provider, and let him validate the fact he wants to
      // sign in with this provider.
      // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
      // so in real scenario you should ask the user to click on a "continue" button
      // that will trigger the signInWithPopup.
      auth.signInWithPopup(provider).then(function (result) {
        // Remember that the user may have signed in with an account that has a different email
        // address than the first one. This can happen as Firebase doesn't control the provider's
        // sign in flow and the user is free to login using whichever account he owns.
        // Step 4b.
        // Link to Facebook credential.
        // As we have access to the pending credential, we can directly call the link method.
        result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred) {
          // Facebook account successfully linked to the existing Firebase user.
          goToApp();
        });
      });
    });
  }
});
firebase.auth().signOut().then(function () {
  // Sign-out successful.
}).catch(function (error) {
  // An error happened.
});
//USER INFO
//Get a list of all the albums
FB.api('/me/albums', function (response) {
  for (album in response.data) {

    // Find the Profile Picture album
    if (response.data[album].name == "Profile Pictures") {

      // Get a list of all photos in that album.
      FB.api(response.data[album].id + "/photos", function(response) {

        //The image link
        image = response.data[0].images[0].source;
        console.log(image);

      });
    }
  }
});
//Facebook
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
    profileInfo();
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
function profileInfo() {
  FB.api(
    '/me',
    'GET',
    {"fields":"id,name,age_range,gender,profile_pic,location"},
    function(response) {
        console.log(response.profile_pic);
        console.log(response);
    }
  );
};
profileInfo();

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
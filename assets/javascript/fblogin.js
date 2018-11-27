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
FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
    console.log(response);
});
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

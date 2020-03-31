import firebase from "firebase/app";
import "firebase/storage"

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBDddKWKWmV6INRzwuYStUvfRTsbpGmlRU",
    authDomain: "recommendationsystembachelor.firebaseapp.com",
    databaseURL: "https://recommendationsystembachelor.firebaseio.com",
    projectId: "recommendationsystembachelor",
    storageBucket: "recommendationsystembachelor.appspot.com",
    messagingSenderId: "440241398297",
    appId: "1:440241398297:web:90035050306897b908c088",
    measurementId: "G-PF2VMQDW1M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage =firebase.storage();

  export {
      storage,firebase as default
  }
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(user.displayName);

    if (user.displayName) {
      window.location.pathname = "/pages/dashboard.html";
    } else {
      window.location.pathname = "/pages/dashboard_admin.html";
    }
    // ...
  } else {
    // User is signed out
    // ..
  }
});

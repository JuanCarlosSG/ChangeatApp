import { getAuth, onAuthStateChanged, updateProfile} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

const fName = document.getElementById("rName");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    if (user.email != "admin@ce.com") {
      if (user.displayName) {
        window.location.pathname = "/ChangeatApp/pages/dashboard.html";
      }
    } else {
      if (user.displayName) {
        window.location.pathname = "/ChangeatApp/pages/dashboard_admin.html";
      }
    }
    // ...
  } else {
    // User is signed out

  }
});

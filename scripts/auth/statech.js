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
      window.open("dashboard_admin.html", "_self");
    } else {
      window.open("dashboard.html", "_self");
    }
    // ...
  } else {
    // User is signed out
    // ..
  }
});

import { getAuth, onAuthStateChanged, updateProfile} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

const fName = document.getElementById("rName");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    if (user.email === "admin@ce.com" & window.location.pathname === "/changeatapp/pages/dashboard.html") {
        window.location.pathname = "/changeatapp/pages/dashboard_admin.html";
    }

    if (user.email != "admin@ce.com" & window.location.pathname === "/changeatapp/pages/dashboard_admin.html") {
        window.location.pathname = "/changeatapp/pages/dashboard.html";
    }

  } else {
    // User is signed out

    window.location.pathname = "/changeatapp/index.html";

  }
});

import app from "../index.js";

import { getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

const auth = getAuth();

const fForm = document.getElementById("nav-login");

const fEmail = document.getElementById("sEmail");

const fPassword = document.getElementById("sPassword");

fForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email = fEmail.value;
  const password = fPassword.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("SIGNED IN SUCCESFULLY");
        if (email === "admin@ce.com") {
          window.location.pathname = "../ChangeatApp/pages/dashboard_admin.html";
          //window.open("/pages/dashboard_admin.html", "_self");
        } else {
          window.location.pathname = "https://juancarlossg.github.io/pages/dashboard.html";
          //window.open("/pages/dashboard.html", "_self");
        }
        fForm.reset();
        // TAKE USER TO HOME PAGE
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });

});

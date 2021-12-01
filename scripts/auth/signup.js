import app from "../index.js";

import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

const auth = getAuth();

const fForm = document.getElementById("nav-signup");

const fEmail = document.getElementById("rEmail");
const fPassword = document.getElementById("rPassword");
const fPasswordR = document.getElementById("rPasswordR");

fForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = fEmail.value;
    const password = fPassword.value;
    const passwordR = fPasswordR.value;
    console.log(email, password);

    if (email != "" & password != "" & passwordR != "") {
      if (password === passwordR) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert("SUCCESFULL REGISTER");
                fForm.reset();
                // ...
                })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                alert(errorMessage);
                // ..
            });
      } else {
        alert("Las contraseñas deben de ser iguales.");
        fPassword.value = "";
        fPasswordR.value = "";
      }
    } else {
      alert("Todos los espacios deben de estar llenos.");
    }

});

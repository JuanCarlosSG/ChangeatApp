import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

const auth = getAuth();

const buttonSO = document.getElementById("signOut");
const buttonSOR = document.getElementById("signOutResp");

buttonSO.addEventListener("click", async (e) => {
    e.preventDefault();

    signOut(auth).then(() => {
        // Sign-out successful.
        alert("SIGN OUT SUCCESFULLY");
        //window.open("index.html", "_self");
        window.location.pathname = "index.html";
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
});

buttonSOR.addEventListener("click", async (e) => {
    e.preventDefault();

    signOut(auth).then(() => {
        // Sign-out successful.
        alert("SIGN OUT SUCCESFULLY");
        //window.open("index.html", "_self");
        window.location.pathname = "index.html";
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
});

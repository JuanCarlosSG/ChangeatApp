
import app from "../index.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

// Aux Variables
let editStatus = false;
let id = "";
let nameS = "";
let imgS = "";
let ingredientsS = "";
let instructionsS = "";

// Firestore Data Base
const db = getFirestore(app);

// HTML Elements
const challengesForm = document.getElementById("challenges-form");
const challengeContainer = document.getElementById("challenge-container");

// CRUD

// CREATE @ Firebase
const createChallenge = (name, img, ingredients, instructions) =>
  addDoc(collection(db, "challenges"), {
    name,
    img,
    ingredients,
    instructions
  });

// READ @ Firebase
const onGetChallenges = (callback) => onSnapshot(collection(db, "challenges"), callback);

// UPDATE @ Firebase

const getChallenge = (id) => getDoc(doc(db, "challenges", id));

const updateChallenge = (id, updatedChallenge) =>
  updateDoc(doc(db, "challenges", id), updatedChallenge);

// DELETE @ Firebase

const deleteChallenge = (id) => deleteDoc(doc(db, "challenges", id));

// READ Values

window.addEventListener("DOMContentLoaded", async (e) => {

  onGetChallenges((querySnapshot) => {

    challengeContainer.innerHTML = "<h4>Retos:</h4>";

    let marginT = 0;
    let aux = 0;

    querySnapshot.forEach((doc) => {

      if (aux != 0) {
        marginT = 3;
      } else {
        marginT = 0;
      }
      aux++;

      const challenge = doc.data();
      challenge.id = doc.id;

      challengeContainer.innerHTML += `
      <div class="card card-body mt-md-${marginT} border-warning">
        <h5>${challenge.name}</h5>
        <div class="row mb-3">
          <div class="col-md-5">
            <img class="img-fluid" src="${challenge.img}" />
          </div>
          <div class="col-md">
            <h6>Ingredientes:</h6>
            <p>${challenge.ingredients}</p>
            <h6>Intrucciones:</h6>
            <p>${challenge.instructions}</p>
          </div>
        </div>
        <div>
          <button class="btn btn-info btn-edit" data-id="${challenge.id}">Editar</button>
          <button class="btn btn-danger btn-delete" data-id="${challenge.id}">Eliminar</button>
        </div>
      </div>`;

      const btnsDelete = document.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteChallenge(e.target.dataset.id);
        });
      });

      const btnsEdit = document.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getChallenge(e.target.dataset.id);
          const challenge = doc.data();

          editStatus = true;
          id = doc.id;

          nameS = challenge.name;
          imgS = challenge.img;
          ingredientsS = challenge.ingredients;
          instructionsS = challenge.instructions;

          window.scrollTo(0, 0);

          document.getElementById("errorLabel").innerText = "";

          challengesForm["challenge-name"].classList.remove("is-invalid");
          challengesForm["challenge-img"].classList.remove("is-invalid");
          challengesForm["challenge-ingredients"].classList.remove("is-invalid");
          challengesForm["challenge-steps"].classList.remove("is-invalid");

          challengesForm["challenge-name"].value = challenge.name;
          challengesForm["challenge-img"].value = challenge.img;
          challengesForm["challenge-ingredients"].value = challenge.ingredients;
          challengesForm["challenge-steps"].value = challenge.instructions;

          challengesForm["btn-challenge-form"].innerText = "Update";
          challengesForm["cancel"].style.visibility = "visible";

        });
      });
    });
  });
});

// CREATE Values

challengesForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  //
  const name = challengesForm["challenge-name"];
  const img = challengesForm["challenge-img"];
  const ingredients = challengesForm["challenge-ingredients"];
  const instructions = challengesForm["challenge-steps"];

  name.classList.remove("is-invalid");
  img.classList.remove("is-invalid");
  ingredients.classList.remove("is-invalid");
  instructions.classList.remove("is-invalid");

  if (!editStatus) {
    if (name.value !== "" && img.value !== "" && ingredients.value !== "" && instructions.value !== "") {

      document.getElementById("errorLabel").innerText = "";

      name.classList.remove("is-invalid");
      img.classList.remove("is-invalid");
      ingredients.classList.remove("is-invalid");
      instructions.classList.remove("is-invalid");

      await createChallenge(name.value, img.value, ingredients.value, instructions.value);

      challengesForm.reset();

    } else {

      if (name.value === "") {
        name.classList.add("is-invalid");
      }

      if (img.value === "") {
        img.classList.add("is-invalid");
      }

      if (ingredients.value === "") {
        ingredients.classList.add("is-invalid");
      }

      if (instructions.value === "") {
        instructions.classList.add("is-invalid");
      }

      document.getElementById("errorLabel").innerText =
        "All have to be filled! Try again.";

    }

  } else {

    if (name.value != nameS || img.value != imgS || ingredients.value != ingredientsS || instructions.value != instructionsS) {

      document.getElementById("errorLabel").innerText = "";

      await updateChallenge(id, {
        name: name.value,
        img: img.value,
        ingredients: ingredients.value,
        instructions: instructions.value
      });

      editStatus = false;
      id = "";

      challengesForm["btn-challenge-form"].innerText = "Save";
      challengesForm["cancel"].style.visibility = "hidden";

      challengesForm.reset();

    } else {

      document.getElementById("errorLabel").innerText =
        "At least one value has to change! Try again.";

    }

  }

});

challengesForm["cancel"].onclick = function () {
  editStatus = false;
  id = "";
  challengesForm["btn-challenge-form"].innerText = "Save";
  challengesForm["cancel"].style.visibility = "hidden";
  document.getElementById("errorLabel").innerText = "";
  challengesForm.reset();
};

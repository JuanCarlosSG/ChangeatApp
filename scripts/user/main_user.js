import app from "../index.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

const db = getFirestore(app);

let ids = [];

let id = null;

const challengeContainer = document.getElementById("nav-retos");

const onGetChallenges = (callback) =>
  onSnapshot(collection(db, "challenges"), callback);

const getChallenge = (id) => getDoc(doc(db, "challenges", id));

window.addEventListener("DOMContentLoaded", async (e) => {

  e.preventDefault();
  // const doc = await getMovie(e.target.dataset.id);
  // const movie = doc.data();

  onGetChallenges((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const challenge = doc.data();
      challenge.id = doc.id;
      ids.push(challenge.id);

      document.getElementById("nav-retos-tab").addEventListener("click", async (e) => {

          id = ids[Math.floor(Math.random() * ids.length)];

          const obj = await getChallenge(id);
          const challenge = obj.data();

          challengeContainer.innerHTML =  `
            <div class="row card border-primary">
              <div class="col p-3" style="text-align: center;">
                <h3 style="text-align: left;">Reto</h3>
                <h4>${challenge.name}</h4>
                <div class="row p-3">
                  <div class="col">
                    <h5>Ingredientes</h5>
                    <p>${challenge.ingredients}</p>
                    <h5>Instrucciones</h5>
                    <p>${challenge.ingredients}</p>
                  </div>
                  <div class="col">
                    <img class="img-fluid rounded" src="${challenge.img}">
                    <div class="d-flex justify-content-end">
                      <button class="btn btn-primary mb-0 m-3" id="btn-next-card">Nuevo Reto</button>
                      <button class="btn btn-primary mr-3 mb-0 mt-3 " id="btn-complete-card">Completar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

      });

    });

  });

});

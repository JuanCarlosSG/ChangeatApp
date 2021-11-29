document.getElementById("nav-signup-tab").onclick = function () {
  document.getElementById("logo-ce").innerHTML =  `<img src="../img/Logo_Orange.png" class="img-fluid pt-5">`;
  document.getElementById("circles").innerHTML =  `<img src="../img/Circles_Orange.png"  class="img-fluid">`;
};

document.getElementById("nav-login-tab").onclick = function () {
  document.getElementById("logo-ce").innerHTML =  `<img src="../img/Logo_Blue.png" class="img-fluid pt-5">`;
  document.getElementById("circles").innerHTML =  `<img src="../img/Circles_Blue.png"  class="img-fluid">`;
};

let login = document.querySelector(".login_btn_l");
let create = document.querySelector(".sign_btn_s");

let loginPage = document.querySelector(".register_login");
let createPage = document.querySelector(".register_sign");

let a = 1;
let b = 1;

create.addEventListener("click", function (e) {
  a++;
  b++;
  if (b == 2) {
    createPage.style.transform = `translateY(${-36 * b}rem)`;
    b = 1;
  }
  if (a == 2) {
    loginPage.style.transform = `translateY( ${0 * a}rem)`;
    a = 1;
  }
});

login.addEventListener("click", function (e) {
  a++;
  b++;
  if (b == 2) {
    createPage.style.transform = `translateY(${-13 * b}rem)`;
    b = 1;
  }
  if (a == 2) {
    loginPage.style.transform = `translateY(${30 * a}rem)`;
    a = 1;
  }
});

// register
let registerBtn = document.querySelector(".nav_sign");
let registerCard = document.querySelector(".register");
let registerClose = document.querySelector(".register_close");

registerBtn.addEventListener("click", function () {
  registerCard.style.display = "block";
});

registerClose.addEventListener("click", function () {
  registerCard.style.display = "none";
});

const cardContent = document.querySelector(".basic_cards");

// popup elements
let popupName = document.querySelector(".popup_basic_title");
let popupDes = document.querySelector(".popup_basic_description");
let popupAdd = document.querySelector(".popup_basic_add");

function func() {
  // const url = fetch("http://127.0.0.1:8004/api/v1/consol");
  // const res = url.json();
  // console.log(url);

  fetch("http://127.0.0.1:8004/api/v1/consol")
    .then((response) => response.json())
    .then((response) => {
      let kel = response.data.book;
      renderHtml(kel);

      console.log(kel);
    })
    .catch((err) => console.error(err));
}
let html;
function renderHtml(arr) {
  arr.forEach((val) => {
    html = `
    <div class="basic_card">
    <div class="card_emoji">📙</div>
    <div class="card_description">
    <div class="card_name">${val.title}</div>
    <div class="card_plus">${val.janri}</div>
    </div>
    <div class="card_footer">
    <div class="card_price">${val.aftor}</div>
    <div class="card_btn">
    <span></span> show more
    </div>
    </div>
    </div>
    `;

    popupName.innerHTML = `${val.title}`;
    popupDes.innerHTML = `${val.janri}`;
    cardContent.insertAdjacentHTML("beforeend", html);
  });
}
func();

// popup;
let popupBtn = document.querySelector(".card_btn");
let popupCard = document.querySelector(".popup");
let body = document.querySelector("body");
let popupClose = document.querySelector(".popup_close");

body.addEventListener("click", function (e) {
  if (e.target.classList.contains("card_btn")) {
    popupCard.style.display = "block";
  }
});

popupClose.addEventListener("click", function () {
  // if (e.target.classList.contains("popup_close")) {
  popupCard.style.display = "none";
  // }
});

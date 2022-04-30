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

// popup
// let popupBtn = document.querySelector(".card_btn");
// let popupCard = document.querySelector(".popup");
// let popupClose = document.querySelector(".popup_close");

// popupBtn.addEventListener("click", function () {
//   popupCard.style.display = "block";
// });

// popupClose.addEventListener("click", function () {
//   popupCard.style.display = "none";
// });

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
    <a class="card_btn" href="product?id={IdProduct}">
    <span></span> show more
    </a>
    </div>
    </div>
    `;
    cardContent.insertAdjacentHTML("beforeend", html);
  });
}
func();

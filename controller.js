const { create } = require("domain");
const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceFunc = require("./module/replaceFunc.js");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let html = fs.readFileSync("./index.html", "utf-8");

let cardHtml = fs.readFileSync("./templates/card.html", "utf-8");

let popup = fs.readFileSync("./templates/popup.html", "utf-8");

const dataD = fs.readFileSync("./data/kitoblar.json", "utf-8");
const dataObj = JSON.parse(dataD);

const server = http.createServer((req, res) => {
  const changeCard = dataObj
    .map((val) => {
      return replaceFunc(cardHtml, val);
    })
    .join("");

  let kelayotganUrl = req.url;

  let query = +url.parse(kelayotganUrl, true).query.id;

  let output = html.replace("{cardHtml}", changeCard);

  if (kelayotganUrl == "/overview") {
    res.writeHead(200, {
      "content-type": "text.html",
      "mening-headrim": "muvaffaqqiyatli ishlamoqda",
    });
    res.end(output);
  } else if (kelayotganUrl == `/product?id=${query}`) {
    let objs = dataObj.find((val) => val.id == query);

    let category = objs.category;

    let arr = [];
    let rekomendatsiya = dataObj.forEach((el) => {
      if (el.category == category) {
        arr.push(el);
      }
    });

    let topish = arr.findIndex((val) => {
      return val.id == query;
    });
    arr.splice(topish, 1);
    let popupQoshilgan = arr
      .map((val) => {
        return replaceFunc(cardHtml, val);
      })
      .join("");

    let popupHtml = replaceFunc(popup, objs);
    const oxiri = popupHtml.replace("{cardHtml}", popupQoshilgan);

    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(oxiri);
  }
});
server.listen("8005", "127.0.0.1");

const express = require("express");
const { use } = require("express/lib/application");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));
app.use(express.json());

app.use((req, res, next) => {
  if (req) {
    req.time = Date.now();
  }
  if (res) {
    res.time = Date.now();
  }
  next();
});

const book = JSON.parse(
  fs.readFileSync(`${__dirname}/data/kitoblar.json`, "utf-8")
);

const bookId = fs.readFileSync(`${__dirname}/data/id.json`, "utf-8");

getBooks = (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
};

getBooksId = (req, res) => {
  const id = +req.params.id;
  const dataId = book.find((val) => val.id == id);

  console.log(dataId);

  res.status(200).json({
    status: "success",
    data: {
      dataId,
    },
  });
};

postBook = (req, res) => {
  const data = req.body;

  const newId = book[book.length - 1].id + 1;

  const conCat = Object.assign({ id: newId }, data);

  book.push(conCat);
  console.log(book);

  fs.writeFile(
    `${__dirname}/data/kitoblar.json`,
    JSON.stringify(book),
    "utf-8",
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: conCat,
        },
      });
    }
  );
};

updateBook = (req, res) => {
  const data = req.body;
  const dataId = req.params.id;

  const FindId = book.find((val) => {
    return val.id == dataId;
  });

  console.log(FindId);
  console.log(data);
};

app.route("/api/v1/consol").get(getBooks).post(postBook);
app.route("/api/v1/consol/:id").get(getBooksId).patch(updateBook);

const port = 8004;
app.listen(port, "127.0.0.1");

// const newId = book[book.length - 1].id + 1;
// const conCat = Object.assign({ id: dataId }, data);

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "interview",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// app.post("/books", (req, res) => {
//   const q = "INSERT INTO books(`title`, `author`, `edition`, `pages`) VALUES (?)";

//   const values = [
//     req.body.title,
//     req.body.author,
//     req.body.edition,
//     req.body.pages,
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });


app.post("/create", (req, resp) => {
  console.log(req.body);
  const title = req.body.title;
  const author = req.body.author;
  const edition = req.body.edition;
  const pages = req.body.pages;

  db.query(
    "INSERT INTO books (title, author, edition, pages	) VALUES(?,?,?,?)",
    [title, author, edition, pages],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        resp.send("values inserted");
      }
    }
  );
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "INSERT INTO books(`title`, `author`, `edition`, `pages`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.author,
    req.body.edition,
    req.body.pages,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});

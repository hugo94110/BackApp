const express = require("express");
const app = express();
const port = 3000;

///////////////////////////////
// ex1
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/some-html", (req, res) => {
  res.send("<html><body><h1>bonjour html</h1></body></html>");
});

app.get("/some-json", (req, res) => {
  const personne = {
    age: 22,
    nom: "Jane"
  };

  res.json(personne);
});

app.get("/transaction", (req, res) => {
  const transactions = [100, 2000, 3000];

  res.json(transactions);
});

app.get("/infos", (req, res) => {
  console.log("Headers : ", req.headers);
  console.log("Body : ", req.body);

  res.json({
    headers: req.headers,
    body: req.body || {}
  });
});

app.get("/exo-query-string", (req, res) => {
  console.log(req.query);
  res.send(`<h1>Age : ${req.query.age}</h1>`);
});

app.get("/get-user/:userId", (req, res) => {
  res.send(req.params.userId);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
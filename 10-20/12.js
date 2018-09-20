const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// $ npx babel-node 12.js
// Example app listening on port  3000 !

// $ curl http://localhost:3000
// Hello World!

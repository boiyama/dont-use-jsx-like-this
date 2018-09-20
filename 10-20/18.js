const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./app.db", err => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS members (
      id integer PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL
    )`,
    err => err && console.error(err.message)
  );

  db.run(`INSERT INTO members (name) VALUES ("Yamamoto")`, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(this.lastID);
  });

  db.all("SELECT * FROM members", (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(rows);
  });
});

db.close(err => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});

// $ npx babel-node 18.js
// Connected to the database.
// 1
// [ { id: 1, name: 'Yamamoto' } ]
// Close the database connection.

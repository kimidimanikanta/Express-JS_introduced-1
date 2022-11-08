const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initialiazeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running  at https://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};

initialiazeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBookQuery = `
    SELECT * FROM book ORDER BY book_id;`;
  const bookArray = await db.all(getBookQuery);
  response.send(bookArray);
});
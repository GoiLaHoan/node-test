import express from "express";
import { insertDataFromCSV, removeAllUsers } from "./script";

const app = express();
const port = 3000;

// Serve HTML page with buttons
app.get("/", (req, res) => {
  const html = `
    <html>
      <head>
        <title>User Management</title>
      </head>
      <body>
        <h1>User Management</h1>
        <form action="/add" method="post">
          <button type="submit">Add Users</button>
        </form>
        <form action="/remove" method="post">
          <button type="submit">Remove All Users</button>
        </form>
      </body>
    </html>
  `;
  res.send(html);
});

// Handle adding users
app.post("/add", (req, res) => {
  insertDataFromCSV();
  res.redirect("/");
});

// Handle removing all users
app.post("/remove", (req, res) => {
  removeAllUsers();
  res.redirect("/");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

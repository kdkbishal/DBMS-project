const express = require("express");
const app = express();
const connection = require("./config/db");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
dotenv.config();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("/delete-data", (req, res) => {
  const deleteQuery = "delete from db.students_info where ID=?";
  connection.query(deleteQuery, [req.query.ID], (err, rows) => {
    if (err) {
      console.log(err);
    } else res.redirect("/data");
  });
});

app.get("/data", (req, res) => {
  connection.query("SELECT * from  db.students_info", (err, rows) => {
    if (err) {
      console.log(err);
    } else res.render("read.ejs", { rows });
  });
});

app.post("/create", (req, res) => {
  const Name = req.body.name;
  const Email = req.body.email;
  const Roll_No = req.body.Roll_No;
  try {
    connection.query(
      " INSERT into  db.students_info (Name,Email,Roll_NO) values(?,?,?)",
      [Name, Email, Roll_No],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else res.redirect("/data");
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 4000, (error) => {
  if (error) throw error;
  console.log(`Port is running on ${process.env.PORT}`);
});

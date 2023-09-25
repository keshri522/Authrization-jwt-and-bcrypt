// create a server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// middlewares
app.use(bodyParser.urlencoded({ extended: true })); // for parsing the data in the http body
app.use(express.json());
app.use(cors());
const router = require("./route/routes");
app.use("/", router);
// databse connection
const connection = require("./dbconnection/config");
connection();
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(4000, () => {
  console.log(`Server is running at the port ${4000}`);
});

const express = require("express");
const server = require("./config/server");
const cors = require("cors");
const PORT = server.port || 9090;
const app = express();

app.use(express.static(__dirname));
var bodyParser = require("body-parser");
const compression = require("compression");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

app.use("/api", require("./src/routes"));
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
const express = require("express");
const setupDB = require("./config/database");
const router = require("./config/routes");
const cors = require("cors");
const app = express();

//const port = 3040;

const port = process.env.PORT || 3000;
const path = require("path");
app.use(cors());
app.use(express.json());
app.use("/", router);

//db configuration
setupDB();
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(port, () => {
  console.log("listening on port", port);
});

const mongoose = require("mongoose");

const CONNECTION_URI =
  process.env.MONGOLAB_URI || "mongodb://localhost:27017/Notes-data";
const setupDB = () => {
  mongoose
    .connect(CONNECTION_URI)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = setupDB;

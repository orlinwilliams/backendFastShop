const mongoose = require("mongoose");
const db = "fastshop";
const host = "localhost";
const port = "27017";

class Connection {
  constructor() {
    mongoose
      .connect(`mongodb://${host}:${port}/${db}`,{useNewUrlParser: true, useUnifiedTopology: true})
      .then((result) => console.log("Connection successfuly database FastShop"))
      .catch((error) => console.log(error));
  }
}

module.exports = Connection;

const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: string,
});
module.exports = mongoose.model("Role", schema);

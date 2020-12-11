const mongoose = require("mongoose");

const schemeCategory = mongoose.Schema(
  {
    nameCategory: { type: String, require: true },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", schemeCategory);

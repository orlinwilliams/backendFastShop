const mongoose = require("mongoose");
const schemeTheme = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    css: { type: String, require: true },
    javascript: { type: String, require: true },
    createdBy: [{ ref: "admin", type: mongoose.Schema.Types.ObjectId }],
    images: [],
  },
  { timestamps: true }
);
module.exports = mongoose.model("theme", schemeTheme);

const mongoose = require("mongoose");

const schemePage = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: {
      type: String,
      require: true,
    },
    mainPage:Boolean,
    css:{
      type:String
    },
    javascript:{
      type:String
    },
    html:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("pages", schemePage);

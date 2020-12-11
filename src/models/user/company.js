const mongoose = require("mongoose");

const schemeCompany = mongoose.Schema(
  {
    nameCompany: { type: String, unique: true, require: true },
    categoryCompany: {
      type: String,
      require: true,
    },
    products:[{
      ref:'products',
      type:mongoose.Schema.Types.ObjectId,
    }],
    categories:[{
      ref:'categories',
      type:mongoose.Schema.Types.ObjectId,
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('company',schemeCompany);
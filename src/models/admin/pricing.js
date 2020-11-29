const mongoose = require("mongoose");

const pricingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    maxQuantityProducts: String,
    maxQuantityPages: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("pricing", pricingSchema);

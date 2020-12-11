const mongoose = require("mongoose");

const schemaProduct = mongoose.Schema(
  {
    nameProduct: { type: String, require: true },
    description:{type: String, require: true},
    price:{type: Number, require: true},
    cost:{type: Number, require: true},
    codeArticle:{type: String, require: true},
    stocks:{ type:Number, require: true },
    category:[{
      ref: 'categories',
      type: mongoose.Schema.Types.ObjectId,
    }],
    productStatus:{type: String, require: true},
    provider:{type: String, require: true},
    images:[]
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", schemaProduct);

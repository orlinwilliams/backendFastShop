const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const category = require("../../models/user/category");
const company = require("../../models/user/company");

router.post("/categories", async (req, res) => {
  const { nameCategory, description, idCompany } = req.body;

  let newCategory = new category({
    nameCategory,
    description,
  });

  let resultCategory = await newCategory.save();
  if (resultCategory) {
    let updateUser = await company.updateOne(
      { _id: idCompany },
      { $push: { categories: resultCategory._id } }
    );
    if (updateUser) {
      res.send({ status: true, resultCategory });
    } else {
      console.log("no econtro la company");
    }
  }
});

router.get("/:idCompany/categories/:idCategory", async (req, res) => {
  let resultCompany = await company
    .find({
      _id: req.params.idCompany,
      //"categories._id": mongoose.Types.ObjectId(req.params.idCategory),
    })
    .populate("categories"); //
  if (resultCompany) {
    let resultCategory = resultCompany[0].categories.filter(
      (category) => category._id == req.params.idCategory
    );

    res.send({ status: true, result: resultCategory[0] });
  } else {
    console.log("No se econtro compañia");
  }
});
router.get("/:idCompany/categories", async (req, res) => {
  let result = await company
    .find(
      {
        _id: req.params.idCompany,
      },
      {categoires:true}
    ).populate("categories"); //
  if (result) {
    res.send({ status: true,result: result[0] });
  } else {
    console.log("No se econtro compañia");
  }
});
router.put("/categories", async (req, res) => {
  const { nameCategory, description, idCategory } = req.body;
  let result = await category.update(
    { _id: idCategory },
    { nameCategory, description }
  );
  if (result) {
    res.send({ status: true, result });
  }
});
router.delete("/categories/:id", async (req, res) => {
  let result = await category.deleteOne({ _id: req.params.id });
  if (result) {
    res.send({ status: true, result });
  }
});

module.exports = router;

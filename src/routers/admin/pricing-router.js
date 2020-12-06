const express = require("express");
const router = express.Router();
const pricing = require("../../models/admin/pricing");

//OBTNER PLANES DE PRECIOS
router.get("/", (req, res) => {
  pricing.find((error, result) => {
    if (error) res.send({ message: "Error al obtner precios", status: false });
    res.send({ result, status: true });
  });
});

//CREAR NUEVO PRECIO
router.post("/", (req, res) => {
  const {
    title,
    description,
    price,
    maxQuantityProducts,
    maxQuantityPages,
  } = req.body;

  const newPrice = new pricing({
    title,
    description,
    price,
    maxQuantityProducts,
    maxQuantityPages,
  });
  newPrice.save((error, result) => {
    if (error) {
      res
        .status(500)
        .send({ message: "Error al registrar nuevo precio", status: false });
    } else {
      res.status(200).send({ result, status: true });
    }
  });
});
//Actualizar precio
router.put("/:id", async (req, res) => {
  const {
    title,
    description,
    price,
    maxQuantityProducts,
    maxQuantityPages,
  } = req.body;

  let priceUpdate = await pricing.updateOne(
    { _id: req.params.id },
    { title, description, price, maxQuantityProducts, maxQuantityPages }
  );
  res.send(priceUpdate);
});
//Obtner un precio
router.get("/:id", (req, res) => {
  pricing.findOne({ _id: req.params.id }, (error, result) => {
    if (error) res.send({ message: "Error al obtner precio", status: false });
    res.send({ result, status: true });
  });
});
//Eliminar un precio
router.delete("/:id", (req, res) => {
  pricing.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) res.send({ message: "Error al eliminar precio", status: false });
    res.send({ result, status: true });
  });
});
module.exports = router;

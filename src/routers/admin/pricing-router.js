const express = require("express");
const router = express.Router();
const pricing = require("../../models/admin/pricing");

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
  newPrice.save((error) => {
    if (error) {
      res.status(500).send("Error al registrar nuevo precio");
    } else {
      res.status(200).send("precio registrado correctamente");
    }
  });

});

module.exports = router;

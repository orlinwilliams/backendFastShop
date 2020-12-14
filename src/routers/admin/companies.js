const express = require("express");
const router = express.Router();
const company = require("../../models/user/company");


//Obtner las compañias
router.get("/", async (req, res) => {
  await company.find((error, result) => {
    if (error) res.send({ message: "Error al obtner categorias", status: false });
    res.send({ result, status: true });
  });
});

//Eliminar las compañias
router.delete("/:id",async (req, res) => {
  let result = await company.deleteOne({_id:req.params.id});
  if(result){

    res.send({status:true, result});
  }
});

module.exports = router;
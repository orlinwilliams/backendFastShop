const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const company = require("../../models/user/company");

//----------agregar producto---
router.post('/', (req, res)=>{

})
//-------Todos los productos de una compañia---
router.get('/:id', (req, res)=>{
  
})
//----------obtener un producto-------
router.get('/:id/product/:id', (req, res)=>{
  
})
//----------Eliminar un producto-------
router.delete('/:id', (req, res)=>{
  
})
module.exports = router;
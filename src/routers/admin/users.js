const express = require("express");
const router = express.Router();
const admin = require("../../models/login-register/admin");
const client = require("../../models/login-register/client");
const user = require("../../models/login-register/user");
const bcrypt = require("bcryptjs");

//Obtener todos los admistradores
router.get("/admin", (req, res) => {
  admin.find(
    {},
    { username: true, email: true, role: true, createdAt: true },
    (error, result) => {
      if (error)
        res.send({ message: "Error al obtner administradores", status: false });
      res.send({ result, status: true });
    }
  );
});
//Obtener un administrador
router.get("/admin/:id", async (req, res) => {
  let result = await admin.findOne({ _id: req.params.id });
  res.send({ result, status: true });
});
//actualizar un administrador
router.put("/admin/:id", async (req, res) => {
  const { username, email, password,} = req.body;
  let adminUpdate = await admin.updateOne(
    { _id: req.params.id },
    { username, email, password:bcrypt.hashSync(password,10)}
  );
  res.send(adminUpdate);
});

//Obtener todos los clientes
router.get("/client", (req, res) => {
  client.find((error, result) => {
    if (error) res.send({ message: "Error al obtner cliente", status: false });
    res.send({ result, status: true });
  });
});

//Obtener todos las usuarios/compañias
router.get("/user", (req, res) => {
  user.find((error, result) => {
    if (error)
      res.send({ message: "Error al obtner usuario/compañia", status: false });
    res.send({ result, status: true });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const registerClient = require("../../models/login-register/client");
const registerUser = require("../../models/login-register/user");
const role = require("../../models/login-register/role");
const jwt = require("jsonwebtoken");

//GUARDAR CLIENTE
router.post("/client", (req, res) => {
  const { username, email, password, role } = req.body;

  const client = new registerClient({
    username,
    email,
    password,
    role,
  });
  client.save((error, result) => {
    if (error) {
      res
        .status(500)
        .send({ message: "error en guardar cliente", status: false });
    } else {
      const tokenClient = jwt.sign({ id: result._id }, "secretclient");
      res.status(200).send({ tokenClient, status: true });
    }
  });
});

//GUARDAR USUARIO
router.post("/user", (req, res) => {
  console.log(req.body);
  const user = new registerUser(req.body);
  user.save((error, result) => {
    if (error) {
      res
        .status(500)
        .send({ message: "error en guardar usuario", status: false });
    } else {
      const tokenUser = jwt.sign({ id: result.id }, "secretuser");
      res.status(200).send({ tokenUser, status: true });
    }
  });
});

//OBTENER ROLES DE USUARIOS
router.get("/role", (req, res) => {
  role.find((error, result) => {
    if (error) res.send({ message: "Error en obtner roles", status: false });
    res.send({ result, status: true });
  });
});

module.exports = router;

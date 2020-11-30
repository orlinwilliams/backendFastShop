const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const client = require("../../models/login-register/client");
const user = require("../../models/login-register/user");
//LOGIN CLIENTES
router.post("/client", (req, res) => {
  const { email, password } = req.body;
  client.findOne({ email }, (error, result) => {
    if (error) res.send({ message: "Error server", status: false });
    if (!result) res.send({ message: "Email not found", status: false });
    else {
      //res.send(email);
      result.comparePassword(password, (error1, result1) => {
        if (error1) res.send({ message: "Password incorret", status: false });
        if (result1) {
          //ENVIAR AL CLIENTE
          const tokenClient = jwt.sign({ id: result._id }, "secretclient");
          res.send({
            tokenClient,
            status: true,
            username: result.username,
            email: result.email,
          });
        } else {
          res.send({ message: "Password/email incorret", status: false });
        }
      });
    }
  });
});

//LOGIN USER
router.post("/user", (req, res) => {
  const { email, password } = req.body;
  user.findOne({ email }, (error, result) => {
    if (error) res.send({ message: "Error server", status: false });
    if (!result) res.send({ message: "Email not found", status: false });
    else {
      //res.send(email);
      result.comparePassword(password, (error1, result1) => {
        if (error1) res.send({ message: "Password incorret", status: false });
        if (result1) {
          //ENVIAR AL CLIENTE
          const tokenClient = jwt.sign({ id: result._id }, "secretuser");
          res.send({
            tokenClient,
            status: true,
            username: result.username,
            email: result.email,
          });
        } else {
          res.send({
            message: "Password/email incorret",
            status: false,
          });
        }
      });
    }
  });
});

module.exports = router;

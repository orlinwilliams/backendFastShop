const express = require("express");
const router = express.Router();
const client = require("../../models/login-register/client");

router.get("/client", (req, res) => {
  const { email, password } = req.body;
  client.findOne({ email }, (error, result) => {
    if (error) res.send({ message: "Error server", status: false });
    if (!result) res.send({ message: "Email not found", status: false });
    else {
      client.comparePassword(password, (error, result1) => {
        if (error) res.send({ message: "Password incorret", status: false });
        if (result1) {
          //ENVIAR AL CLIENTE
        } else {
          res.send({ message: "Password/email incorret", status: false });
        }
      });
    }
  });
});

module.exports = router;

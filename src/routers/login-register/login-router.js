const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const client = require("../../models/login-register/client");
const user = require("../../models/login-register/user");
//LOGIN CLIENTES
router.post("/", (req, res) => {
  const { email, password } = req.body;
  client
    .findOne({ email }, (error, resultClient) => {
      if (error) res.send({ message: "Error server", status: false });
      
      //SI no se encuentra en el documento de cliente
      else if (!resultClient) {
        user
          .findOne({ email }, (errorUser, resultUser) => {
            if (errorUser) res.send({ message: "Error server", status: false });
            if (!resultUser)
              res.send({ message: "Email not found", status: false });
            else {
              
              resultUser.comparePassword(password, (errorUser2, resultUser2) => {
                if (errorUser2)
                  res.send({ message: "Password incorret", status: false });
                if (resultUser2) {
                  //ENVIAR AL CLIENTE
                  const tokenUser = jwt.sign(
                    { id: resultUser._id },
                    "secretuser"
                  );
                  res.send({
                    tokenUser,
                    status: true,
                    username: resultUser.username,
                    email: resultUser.email,
                    role: resultUser.role,
                    price: resultUser.price,
                  });
                } else {
                  res.send({
                    message: "Password/email incorret",
                    status: false,
                  });
                }
              });
            }
          })
          .populate("price")
          .populate("role");

      } else {
        resultClient.comparePassword(password, (error1, result1) => {
          if (error1) res.send({ message: "Password incorret", status: false });
          if (result1) {
            //ENVIAR AL CLIENTE
            const tokenClient = jwt.sign({ id: resultClient._id }, "secretclient");
            res.send({
              tokenClient,
              status: true,
              username: resultClient.username,
              email: resultClient.email,
              role: resultClient.role,
            });
          } else {
            res.send({ message: "Password/email incorret", status: false });
          }
        });
      }
    })
    .populate("role");
});

//LOGIN USER
// router.post("/user", (req, res) => {
//   const { email, password } = req.body;
// });

module.exports = router;

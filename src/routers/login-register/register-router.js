const express = require("express");
const router = express.Router();
const registerClient = require("../../models/login-register/client");
const registerUser = require("../../models/login-register/user");
const companyModel = require("../../models/user/company");
const registerAdmin = require("../../models/login-register/admin");
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

//---------------Guardar user/companies---------------
router.post("/user", async (req, res) => {
  let newUser = {};
  const { username, email, password, role, country, price, address } = req.body;
  const { nameCompany, categoryCompany } = req.body;
  let newCompany = new companyModel({ nameCompany, categoryCompany });
  let resultCompany = await newCompany.save();
  if (!resultCompany) {
    res.send({ status: false, message: "Error en guardar compañia" });
  }
  
  newUser = new registerUser({
    username,
    email,
    password,
    company:resultCompany._id,
    role,
    country,
    price,
    address,
  });
  
  try {
    newUser.save((error, resultUser) =>{
      if(error) console.log(error);
      else{
        console.log(resultUser);
        const tokenUser = jwt.sign({ id: resultUser._id }, "secretuser");
        res.status(200).send({ tokenUser, status: true });
      }
    });
    
  } catch (error2) {
    console.log(error2);
    res.send({ message: "Error en guardar USUARIO", status: false });
  }
});
//---------------Guardar admin-------------------
router.post("/admin", (req, res) => {
  console.log(req.body);
  const admin = new registerAdmin(req.body);
  admin.save((error, result) => {
    if (error) {
      res
        .status(500)
        .send({ message: "error en guardar admin", status: false });
    } else {
      const tokenAdmin = jwt.sign({ id: result.id }, "secretadmin");
      res.status(200).send({ tokenAdmin, status: true });
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

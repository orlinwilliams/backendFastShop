const express = require("express");
const router = express.Router();
const registerClient = require("../../models/login-register/client");

router.post("/client", (req, res) => {
  const { username, email, password, role } = req.body;
  
  const client = new registerClient({ 
    username, 
    email, 
    password
  });
  client.save(error =>{
    if(error){
      res.status(500).send('Error al registrar usuario'); 
    }else{
      res.status(200).send('usario registrado correctamente');
    }
  })
  
    console.log(client);
    
});

module.exports = router;

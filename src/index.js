const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Connection = require("./module/dataBase");

//ROUTES
const loginRouter = require("./routers/login-register/login-router");
const registerRouter = require("./routers/login-register/register-router");
const pricingRouter = require("./routers/admin/pricing-router")
//conectando a la base de datos
new Connection();

//middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Enrutadores
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/pricing", pricingRouter);



app.listen(8888, () => console.log("SERVER FASTSHOP ONLINE"));

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Connection = require("./module/connectionDataBase");

//conectando a la base de datos
new Connection();

//middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Enrutadores

app.listen(8888, () => console.log("SERVER FASTSHOP ONLINE"));

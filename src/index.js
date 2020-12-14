const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Connection = require("./module/dataBase");

//ROUTES
const loginRouter = require("./routers/login-register/login-router");
const registerRouter = require("./routers/login-register/register-router");
const pricingRouter = require("./routers/admin/pricing-router");
const usersRouter = require("./routers/admin/users-router");
const themesRouter = require("./routers/admin/themes-router");
const productsRouter = require("./routers/user/products-router");
const pagesRouter = require('./routers/user/pages-router');
const categoriesRouter = require('./routers/user/categories-router')
const companiesRouter = require('./routers/admin/companies')
const path = require("path");

//conectando a la base de datos
new Connection();

//middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-----------static files---------
app.use(express.static(path.join(__dirname,'assets/themes')));
//----------Enrutadores generales--------
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/pricing", pricingRouter);

//----------Enrutadores administradores
app.use("/admin/users", usersRouter);
app.use("/admin/theme", themesRouter);
app.use("/admin/companies", companiesRouter);

//----------Enrutadores usuarios/compañias
app.use('/admin-companies/pages',pagesRouter);
app.use('/admin-companies',categoriesRouter);
app.use('/admin-companies/products',productsRouter);


app.listen(8888, () => console.log("SERVER FASTSHOP ONLINE"));

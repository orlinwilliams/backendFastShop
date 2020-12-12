const express = require("express");
const router = express.Router();
const page = require("../../models/user/pages");
const user = require("../../models/login-register/user");
//---------------crear pagina-----------
router.post("/", async (req, res) => {
  const { title, description, mainPage, idUser } = req.body;
  let newPage = new page({
    title,
    description,
    mainPage,
  });
  let resultPage = await newPage.save();
  if (!resultPage)
    res.send({ status: false, message: "error en ingresar pagina" });
  try {
    let updateUser = await user.updateOne(
      { _id: idUser },
      { pages: resultPage._id }
    );
    if (updateUser) {
      res.send({ status: true, updateUser });
    }
  } catch (error) {
    res.send({ status: false, message: "error en actualizar usuario " });
  }
});
//----------------------obtener una pagina----------------
router.get("/:id", async (req, res) => {
  let result = await page.findById(req.params.id);
  if (result) {
    res.send({ status: true, result });
  }
});
//----------------------obtener paginas----------------
router.post("/all", async (req, res) => {
  let result = await user.findById(req.body.id).populate("pages");

  if (result) {
    res.send({ status: true, pages: result.pages });
  }
});

//--------------------actualizar pagina------------
router.put("/:id", async (req, res) => {
  const { css, javascript, html } = req.body;
  let updatePage = await page.updateOne(
    { _id: req.params.id },
    { css, javascript, html }
  );
  if (updatePage) {
    res.send({ status: true, updatePage });
  }
});
//----------------------eliminar una pagina----------------
router.post("/delete", async (req, res) => {
  const { idUser, idPage } = req.body;
  let deletePage = await page.findByIdAndRemove({ _id: idPage });
  if (deletePage) {
    let updateUser = await user.updateOne(
      { _id: idUser },
      { $pull: { pages: idPage } }
    );
    if (updateUser) {
      res.send({ status: true, updateUser });
    }
  }
});
//----------------------eliminar una pagina----------------
router.delete("/:id", async (req, res) => {
  let result = await page.deleteOne({ _id: req.params.id });
  if (result) {
    res.send({ status: true, result });
  }
});
module.exports = router;

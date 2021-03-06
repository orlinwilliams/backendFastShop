const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const theme = require("../../models/admin/theme");
const fs = require("fs").promises;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets/themes"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage }).array("images", 12);

//----------------Nuevo tema----------
router.post("/", upload, async (req, res) => {
  const { body, files } = req;
  const images = [];
  if (body && files) {
    files.forEach((img) => {
      images.push({
        fieldname: img.fieldname,
        name: img.originalname,
        path: img.filename,
        mimeType: img.mimeType,
      });
    });
    const newTheme = theme({
      title: body.title,
      description: body.description,
      css: body.css,
      javascript: body.javascript,
      createdBy: body.createdBy,
      images: images,
    });
    const result = await newTheme.save();
    if(result)res.send({ result, status: true });
  }
});
router.get("/", async (req, res) => {
  let result = await theme
    .find(
      {},
      {
        title: true,
        description: true,
        css: true,
        javascript: true,
        createdAt: true,
      }
    )
    .populate("createdBy", "username");
    if(result){
      res.send({ status: true, result });
    }
});

router.get("/:id", async (req, res) => {
  let result = await theme
    .findOne(
      { _id: req.params.id },
      {
        title: true,
        description: true,
        css: true,
        javascript: true,
        createdAt: true,
      }
    )
    .populate("createdBy", "username");
    if(result){
      res.send({ status: true, result });
    }
});
//------------editar tema--------------
router.put("/:id", async (req, res) => {
  const { title, description, css, javascript } = req.body;
  const updateTheme = await theme.updateOne(
    { _id: req.params.id },
    { title, description, css, javascript }
  );
  if(updateTheme)res.send({updateTheme, status:true});


});

//--------------Eliminar un thema----------------
router.delete("/:id", async (req, res) => {
  let result = await theme.findByIdAndDelete({ _id: req.params.id });
  let pathsDeletes = [];
  if (result) {
    result.images.forEach((imgPath) => {
      pathsDeletes.push(imgPath.path);
    });
    Promise.all(
      pathsDeletes.map((image) =>
        fs.unlink(path.join(__dirname, "../../assets/themes/" + image))
      )
    )
      .then(() => {
        console.log("images deletes");
        res.send({ status: true, result });
      })
      .catch((error) => console.log(error));
  }
});

module.exports = router;

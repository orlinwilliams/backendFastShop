const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const adminSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: { type: String, require: true },
    role: [
      {
        ref: "role",
        type: mongoose.Schema.Types.ObjectId,
      },
    ]
  },
  { timestamps: true }
);

//FUNCION PARA ENCRYPTAR CONTRASEÑA
adminSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

//FUNCION PARA LOGIN COMPARAR PASSWORD
adminSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("admin", adminSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema(
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
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    nameCompany: {
      type: String,
      require: true,
      unique: true,
    },
    country: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    categoryCompany: {
      type: String,
      require: true,
    },
    price: { ref: "pricing", type: mongoose.Schema.Types.ObjectId },

  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("user", userSchema);

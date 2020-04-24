const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "invalid Email";
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  tokens: [
    {
      token: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

userSchema.methods.generateToken = function () {
  const user = this;
  const tokenData = {
    _id: user._id,
    username: user.usename,
    createdAt: Number(new Date()),
  };

  const token = jwt.sign(tokenData, "jwt@123");
  console.log(token);
  user.tokens.push({ token });
  return user
    .save()
    .then(function (user) {
      return Promise.resolve(token);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
};
userSchema.statics.findByToken = function (token) {
  const User = this;
  let tokenData;
  try {
    tokenData = jwt.verify(token, "jwt@123");
  } catch (error) {
    return Promise.reject(error);
  }

  return User.findOne({
    _id: tokenData._id,
    "tokens.token": token,
  });
};

userSchema.statics.findByCredential = function (email, password) {
  const User = this;
  return User.findOne({
    email,
  })
    .then(function (user) {
      if (!user) {
        return Promise.reject({ error: "invalid email / password" });
      }
      return bcryptjs
        .compare(password, user.password)
        .then(function (result) {
          if (!result) {
            return Promise.reject({ error: "invalid email / password" });
          } else {
            return Promise.resolve(user);
          }
        })
        .catch(function (err) {
          return Promise.reject(err);
        });
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
};

//pre-hooks
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then(function (salt) {
      bcryptjs.hash(user.password, salt).then(function (encryptedPassword) {
        user.password = encryptedPassword;
        next();
      });
    });
  } else {
    console.log("old only");
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};

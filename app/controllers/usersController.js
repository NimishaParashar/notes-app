const { User } = require("../models/User");

module.exports.show = (req, res) => {
  const { user, token } = req;
  console.log("token" + token);
  res.send(user);
};

module.exports.create = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const { user, token } = req;
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(function () {
      res.send({ notice: "Succesfully logout" });
    })
    .catch(function (err) {
      res.send(err);
    });
};

module.exports.createToken = (req, res) => {
  const body = req.body;
  User.findByCredential(body.email, body.password)
    .then(function (user) {
      //  res.json(user);
      return user.generateToken();
    })
    .then(function (token) {
      res.setHeader("x-auth", token).send({});
      // res.json(token);
    })
    .catch(function (err) {
      res.json(err);
    });
};

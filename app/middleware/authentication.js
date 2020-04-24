const { User } = require("../models/User");

const authenticationUser = function(req, res, next) {
  const token = req.header("x-auth");
  User.findByToken(token)
    .then(function(user) {
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status("401").send({ notice: "token not available" });
      }
    })
    .catch(function(err) {
      res.json(err);
    });
};

module.exports = {
  authenticationUser
};

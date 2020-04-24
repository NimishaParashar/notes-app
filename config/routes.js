const express = require("express");
const router = express.Router();
const { authenticationUser } = require("../app/middleware/authentication");
const notesController = require("../app/controllers/notesController");
const usersController = require("../app/controllers/usersController");
const categoriesController = require("../app/controllers/categoriesController");
router.get("/notes", notesController.list);
router.get("/notes/:id", notesController.show);
router.post("/notes", notesController.create);
router.put("/notes/:id", notesController.update);
router.delete("/notes/:id", notesController.destroy);

router.get("/categories", categoriesController.list);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.show);
router.delete(
  "/categories/:id",
  authenticationUser,
  categoriesController.destroy
);
router.put("/categories/:id", authenticationUser, categoriesController.update);
router.post("/users/register", usersController.create);
router.post("/users/login", usersController.createToken);
router.delete("/users/logout", authenticationUser, usersController.destroy);
router.get("/users/account", authenticationUser, usersController.show);

module.exports = router;

const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/books");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/books/book");


router.get("/", ctrl.getAll)

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id", ctrl.deleteById);


module.exports = router;
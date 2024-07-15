const express = require("express");
const { getReviewsByBook } = require("../controllers/reviwControllers");

const router = express.Router();

router.get("/:bookId", getReviewsByBook);

module.exports = router;

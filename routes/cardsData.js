const express = require("express");
const router = express.Router();
const { getCards } = require("../controllers/cardsController");

router.get("/cards", getCards);

module.exports = router;

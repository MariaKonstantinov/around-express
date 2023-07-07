const { getJsonFromFile } = require("../helpers/files");

// adding path method
const path = require("path");
const cardsFilePath = path.join(__dirname, "..", "data", "cards.json");

// get all cards
const getCards = async (req, res) => {
  try {
    const cards = await getJsonFromFile(cardsFilePath);

    res.send(cards);
  } catch (error) {
    console.log("Error happened in getCards", error);
    res.status(500).send("An error has occurred on the server");
  }
};

module.exports = {
  getCards,
};

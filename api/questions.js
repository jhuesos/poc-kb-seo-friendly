const articles = require("./data.json");

module.exports = (req, res) => {
  res.status(200).send(JSON.stringify(articles));
};

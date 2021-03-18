const data = require("../data.json");

module.exports = (req, res) => {
  const {
    query: { id },
  } = req;

  const { questions } = data;
  const [question] = questions.filter((q) => q.id === id);
  res.status(200).send(JSON.stringify(question));
};

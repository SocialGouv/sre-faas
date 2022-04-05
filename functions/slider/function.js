const getWeek = require("date-fns/getWeek");

const sliders = ["Adrien", "Gary", "Jo", "Julien", "Mateo"];

module.exports = async (req, res) => {
  const refDate = new Date();
  const weekNumber = getWeek(refDate);
  return sliders[weekNumber % sliders.length];
};

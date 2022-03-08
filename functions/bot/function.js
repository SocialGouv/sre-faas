const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async (req, res) => {
  await sleep(500);
  return "Bot Ready!";
};

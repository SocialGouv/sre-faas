

module.exports = async (req, res) => {
  const accounts = process.env.TIPIMAIL_ACCOUNTS;
  console.log(accounts);
  return "io"
};

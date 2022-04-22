const pAll = require("p-all");

const getAccountCredits = async (account) => {
  fetch("https://api.tipimail.com/v1/account", {
    headers: {
      "X-Tipimail-ApiUser": account.username,
      "X-Tipimail-ApiKey": account.token,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  })
    .then((r) => r.json())
    .then((data) => data.credits);
};

const getAccountsCredits = async (accounts) => {
  const metrics = [
    "# TYPE tipimail_credits gauge",
    ...(await pAll(
      accounts.map(
        (account) => () =>
          `tipimail_credits{account="${account.name}"} ${getAccountCredits(
            account
          )}`
      )
    ),
    { concurrency: 1 }),
  ];
  return metrics.join("\n");
};

module.exports = async (req, res) => {
  const accounts = JSON.parse(process.env.TIPIMAIL_ACCOUNTS);
  console.log(accounts);
  return getAccountsCredits(accounts);
};

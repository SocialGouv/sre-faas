const { send } = require("micri");

const fetch = require("node-fetch");
const pAll = require("p-all");

const getAccountInfo = async (account) =>
  fetch("https://api.tipimail.com/v1/account", {
    headers: {
      "X-Tipimail-ApiUser": account.username,
      "X-Tipimail-ApiKey": account.token,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  }).then((r) => r.json());

const getAccountsCredits = async (accounts) => {
  const metrics = [
    "# TYPE tipimail_credits gauge",
    ...(await pAll(
      accounts.map((account) => async () => {
        const accountInfo = await getAccountInfo(account);
        return `tipimail_credits{account="${account.name}"} ${accountInfo.credits}`;
      }),
      { concurrency: 1 }
    )),
  ];
  return metrics.join("\n");
};

const isValid = (req) => {
  return req.url.indexOf(`token=${process.env.ACCESS_TOKEN}`) > -1;
};

module.exports = async (req, res) => {
  if (!isValid(req)) {
    const data = "nothing here";
    return send(res, 200, data);
  }
  const accounts = JSON.parse(process.env.TIPIMAIL_ACCOUNTS || "[]");
  return getAccountsCredits(accounts);
};

// const accounts = require("./accounts.json");
// getAccountsCredits(accounts).then(console.log).catch(console.log);

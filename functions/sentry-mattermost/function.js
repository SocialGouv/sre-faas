const { json } = require("micri");
const queryString = require("query-string");

const MATTERMOST_WEBHOOK_URL = process.env.MATTERMOST_WEBHOOK_URL;

const forwardSentryEvent = (payload, channel) => {
  const event = payload.event.body.data.event;
  const markdown = `
:warning: **${event.title}** [${event.environment}]

browser : ${event.contexts.browser.name}/${
    event.contexts.os
      ? event.contexts.os.name
      : event.contexts.client_os
      ? event.contexts.client_os.name
      : event.contexts.device.model
  }
url : ${event.request.url}

[See details in sentry](${event.web_url})
`;

  const response = {
    response_type: "in_channel",
    channel: channel || "sentry/alerts",
    username: "Sentry",
    // icon_url:
    //  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/198/freezing-face_1f976.png",
    text: markdown,
  };

  return fetch(MATTERMOST_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.text());
};

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const parsed = queryString.parse(req.url.substring(req.url.indexOf("?")));
    const channel = parsed.channel;
    try {
      const payload = await json(req);
      await forwardSentryEvent(payload, channel);
    } catch (e) {
      console.error(e);
    }
  }
  return "ok";
};
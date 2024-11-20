const fetch = require("node-fetch");
const EVENTS_HTTP_ENDPOINT = process.env.HTTP_ENDPOINT;
const API_KEY = process.env.API_KEY;
const CHANNEL = process.env.CHANNEL_NAMESPACE;
const { logger } = require("../../utils/logger");

const authorization = { "x-api-key": API_KEY, host: EVENTS_HTTP_ENDPOINT };
const sendMessage = async (payload) => {
  logger.info(`Sending message to channel,${CHANNEL}`);
  const event = {
    channel: "/new-updates",
    events: [JSON.stringify(payload)], // can be array or object depending on number of events being sent
  };

  const response = await fetch(`https://${HTTP_DOMAIN}/event`, {
    method: "POST",
    headers: authorization,
    body: JSON.stringify(event),
  });

  logger.info(
    "Publish response",
    JSON.stringify(await response.json(), null, 2)
  );
};

module.exports = { sendMessage };

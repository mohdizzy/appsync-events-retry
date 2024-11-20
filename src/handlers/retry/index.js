const { getObject } = require("../../utils/s3");
const BUCKET_NAME = process.env.PAYLOAD_BUCKET;
const { sendMessage } = require("../../utils/publish");
const { logger } = require("../../utils/logger");

exports.handler = async (event, context) => {
  logger.info("Retrying event", event);

  try {
    // get schedule name
    const bucketKey = event.eventId;

    // retrieve payload
    const payload = await getObject(BUCKET_NAME, `${bucketKey}.json`);

    console.log(payload);

    // send message to channel
    await sendMessage(payload.Body.transformToString());

    logger.info("Event retried successfully");
  } catch (error) {
    logger.error("Something went wrong", error);
  }
};

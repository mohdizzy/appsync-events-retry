const { putObject } = require("../../utils/s3");
const BUCKET_NAME = process.env.PAYLOAD_BUCKET;
const { logger, metricUnits } = require("../../utils/logger");
const { sendMessage } = require("./publish");
const EVENT_CHANNEL = process.env.EVENT_CHANNEL;
const { v7: uuidv7 } = require("uuid");
const { createEventScheduler } = require("./scheduler");

exports.handler = async (event, context) => {
  const mock_payload = {
    eventID: uuidv7(),
    eventTime: new Date().toISOString(),
    eventDetails: {
      name: "myEvent",
      type: "test",
    },
  };

  try {
    logger.info("Mock payload", mock_payload);

    // create schedule & publish to channel
    await Promise.all([
      await sendMessage(mock_payload),
      await createEventScheduler(mock_payload.eventID),
    ]);

    // upload payload to S3
    await putObject(BUCKET_NAME, mock_payload.eventID, mock_payload),
      logger.info("Payload published and uploaded to S3");
  } catch (error) {
    logger.error("Something went wrong", error);
  }
};

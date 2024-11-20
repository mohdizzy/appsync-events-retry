const { putObject } = require("../../utils/s3");
const BUCKET_NAME = process.env.PAYLOAD_BUCKET;
const { logger, metricUnits } = require("../../utils/logger");
const { sendMessage } = require("../../utils/publish");

const { v7: uuidv7 } = require("uuid");
const { createEventScheduler } = require("./scheduler");

exports.handler = async (event, context) => {
	const mock_payload = {
		eventID: uuidv7(),
		eventTime: new Date(),
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
		await putObject(BUCKET_NAME, `${mock_payload.eventID}.json`, mock_payload);
		logger.info("Payload published and uploaded to S3");
	} catch (error) {
		logger.error("Something went wrong", error);
	}
};

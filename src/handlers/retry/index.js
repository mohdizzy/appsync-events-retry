const { getObject } = require("../../utils/s3");
const BUCKET_NAME = process.env.PAYLOAD_BUCKET;
const { sendMessage } = require("../../utils/publish");
const { logger } = require("../../utils/logger");

exports.handler = async (event, context) => {
	logger.info("Retrying event", event);

	try {
		// get schedule name
		const bucketKey = event.detail.scheduleName;

		// retrieve payload
		const payload = await getObject(BUCKET_NAME, bucketKey);

		// send message to channel
		await sendMessage(JSON.parse(payload.Body.toString()));

		logger.info("Event retried successfully");
	} catch (error) {
		logger.error("Something went wrong", error);
	}
};

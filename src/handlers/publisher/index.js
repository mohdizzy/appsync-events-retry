const {
	SchedulerClient,
	CreateScheduleCommand,
	FlexibleTimeWindowMode,
	ActionAfterCompletion,
} = require('@aws-sdk/client-scheduler');
const { putObject } = require('../../utils/s3');
const BUCKET_NAME = process.env.PAYLOAD_BUCKET;

exports.handler = async (event, context) => {
	// create schedule
};

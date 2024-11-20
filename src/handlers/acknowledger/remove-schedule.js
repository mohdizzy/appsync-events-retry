const {
	SchedulerClient,
	DeleteScheduleCommand,
} = require("@aws-sdk/client-scheduler");
const schedulerClient = new SchedulerClient({ region: process.env.AWS_REGION });
const { logger } = require("../../utils/logger");

const deleteSchedule = async (eventId) => {
	const input = {
		Name: eventId,
	};

	try {
		const command = new DeleteScheduleCommand(input);
		const response = await schedulerClient.send(command);
		logger.info("Scheduler removed", response);
	} catch (error) {
		logger.error("Error removing schedule", error);
		throw new Error(error);
	}
};

module.exports = { deleteSchedule };

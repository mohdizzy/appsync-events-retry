const {
	SchedulerClient,
	CreateScheduleCommand,
	FlexibleTimeWindowMode,
	ActionAfterCompletion,
} = require('@aws-sdk/client-scheduler');

exports.handler = async (event, context) => {
	console.log('Event :', event);
	const eventID = event.detail.eventID;

	//remove event from scheduler
};
const createEventScheduler = async (global, flightDetails) => {
	const { marketingCarrierCode, marketingFlightNumber, departureDate } =
		flightDetails;
	const sqsMessage = getSqsMessage(flightDetails);
	const currentDateTime = new Date();
	const input = {
		Name: sqsMessage.schedulerName,
		Description: `Event Scheduler for flight ${marketingCarrierCode}-${marketingFlightNumber} departure date ${departureDate}`,
		// GroupName: "BoardingProgress",
		ScheduleExpression: 'rate(1 minute)',
		// State: "enabled",
		Target: {
			Arn: process.env.BOARDING_START_SQS_ARN,
			RoleArn: process.env.LAMBDA_ROLE_ARN,
			DeadLetterConfig: {
				// DeadLetterConfig
				Arn: process.env.BOARDING_START_DLQ_ARN,
			},
			Input: JSON.stringify(sqsMessage),
		},
		FlexibleTimeWindow: {
			// FlexibleTimeWindow
			Mode: FlexibleTimeWindowMode.OFF,
		},
		StartDate: currentDateTime,
		EndDate: addMinutes(currentDateTime, 90),
		ActionAfterCompletion: ActionAfterCompletion.DELETE,
	};
	logger(global, 'Scheduler Creation :', input);
	try {
		const command = new CreateScheduleCommand(input);
		const createScheduleResponse = await schedulerClient.send(command);
		logger(global, 'SQS Message Scheduler Created :', createScheduleResponse);
		return true;
	} catch (error) {
		logger(global, 'Error In Creating Scheduler :', Error(error));
		throw new Error(error);
	}
};
